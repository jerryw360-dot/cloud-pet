const { app, BrowserWindow, screen, ipcMain } = require("electron");
const path = require("path");
const https = require("https");
const http = require("http");
const { URL } = require("url");

// Windows 高分屏（本机 200% DPI）+ 部分 NVIDIA 驱动下，硬件合成（DirectComposition）
// 会让透明无边框窗口“内容存在但不上屏”：capturePage 能抓到画面，桌面却看不到，
// 点击也穿透到下层窗口。桌宠窗口很小，改用软件合成可稳定显示透明窗口。
app.disableHardwareAcceleration();

let mainWindow = null;

// 窗口尺寸常量
const SMALL_SIZE = { width: 180, height: 180 }; // 只显示宠物
const MENU_SIZE = { width: 260, height: 540 };    // 显示右键菜单

function createWindow() {
  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: SMALL_SIZE.width,
    height: SMALL_SIZE.height,
    x: screenWidth - 220,
    y: screenHeight - 220,
    minWidth: 120,
    minHeight: 120,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: false,
    resizable: true,
    hasShadow: false,
    backgroundColor: "#00000000",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js")
    }
  });

  mainWindow.setAlwaysOnTop(true, "screen-saver");
  // 清除缓存，确保加载最新的页面文件
  mainWindow.webContents.session.clearCache().finally(() => {
    mainWindow.loadFile("index.html");
  });

  mainWindow.webContents.on("context-menu", (e) => {
    e.preventDefault();
  });

  // 窗口失焦（用户点击窗口外的桌面/其他应用）：通知渲染端收起右键菜单
  mainWindow.on("blur", () => {
    mainWindow.webContents.send("window-blur");
  });

  // 右键落在 -webkit-app-region:drag（宠物拖拽区）时，渲染进程收不到 contextmenu，
  // Windows 会把它当作非客户区右键 -> 拦截系统菜单，转发屏幕坐标给渲染进程弹出自定义菜单
  mainWindow.on("system-context-menu", (event, x, y) => {
    event.preventDefault();
    const point = screen.getCursorScreenPoint(); // DIP 坐标，与窗口 bounds 一致
    mainWindow.webContents.send("native-context-menu", { x: point.x, y: point.y });
  });

  // drag 区左键按下会进入 Windows 模态移动循环（单击也会进入，只是不产生位移），
  // 渲染进程收不到任何鼠标事件。hook 循环起止与移动轨迹，转发给渲染进程判定抚摸/抛掷。
  let inSizeMove = false;
  let downInfo = null;
  let moveSamples = [];

  // WM_ENTERSIZEMOVE：按下并开始移动循环
  mainWindow.hookWindowMessage(0x0231, () => {
    inSizeMove = true;
    moveSamples = [];
    const p = screen.getCursorScreenPoint();
    downInfo = { t: Date.now(), x: p.x, y: p.y };
    mainWindow.webContents.send("native-drag-start");
  });

  // WM_MOVE：拖拽过程中采样光标轨迹（仅保留最近 150ms，用于算松手瞬时速度）
  mainWindow.hookWindowMessage(0x0003, () => {
    if (!inSizeMove) return;
    const p = screen.getCursorScreenPoint();
    const now = Date.now();
    moveSamples.push({ t: now, x: p.x, y: p.y });
    const cutoff = now - 150;
    while (moveSamples.length > 2 && moveSamples[0].t < cutoff) moveSamples.shift();
  });

  // WM_EXITSIZEMOVE：松手，结束移动循环
  mainWindow.hookWindowMessage(0x0232, () => {
    if (!inSizeMove || !downInfo) return;
    inSizeMove = false;
    const start = downInfo;
    downInfo = null;
    const ep = screen.getCursorScreenPoint();
    const end = { t: Date.now(), x: ep.x, y: ep.y };

    // 松手前最后一段（>=60ms）的光标速度作为抛掷初速度（DIP 像素/毫秒）
    let vx = 0, vy = 0;
    if (moveSamples.length >= 2) {
      const last = moveSamples[moveSamples.length - 1];
      let ref = moveSamples[0];
      for (let i = moveSamples.length - 2; i >= 0; i--) {
        if (last.t - moveSamples[i].t >= 60) { ref = moveSamples[i]; break; }
      }
      const dt = last.t - ref.t;
      if (dt > 0) {
        vx = (last.x - ref.x) / dt;
        vy = (last.y - ref.y) / dt;
      }
    }

    mainWindow.webContents.send("native-drag-end", {
      sx: start.x, sy: start.y,
      x: end.x, y: end.y,
      t0: start.t, t1: end.t,
      vx, vy
    });
  });
}

// 监听窗口大小调整请求（handle：渲染进程可 await 缩放真正完成）
ipcMain.handle("resize-window", (event, { width, height }) => {
  if (!mainWindow) return;
  const [currentW, currentH] = mainWindow.getSize();
  const [x, y] = mainWindow.getPosition();

  // 调整大小，保持窗口右下角位置不变（让宠物位置视觉稳定）
  mainWindow.setSize(width, height, false);
  // 把窗口向右下方移动，保持右下角对齐
  mainWindow.setPosition(x + (currentW - width), y + (currentH - height), false);
});

// 监听窗口相对移动请求
ipcMain.on("move-window", (event, { dx, dy }) => {
  if (!mainWindow) return;
  const [x, y] = mainWindow.getPosition();
  const [w, h] = mainWindow.getSize();
  const display = screen.getDisplayMatching({ x, y, width: w, height: h });
  const wa = display.workArea;
  let nx = x + dx;
  let ny = y + dy;
  // 限制在屏幕工作区内
  nx = Math.max(wa.x, Math.min(nx, wa.x + wa.width - w));
  ny = Math.max(wa.y, Math.min(ny, wa.y + wa.height - h));
  mainWindow.setPosition(Math.round(nx), Math.round(ny), false);
});

// 监听窗口绝对位置设置请求
ipcMain.on("set-window-position", (event, { x, y }) => {
  if (!mainWindow) return;
  const [w, h] = mainWindow.getSize();
  const display = screen.getDisplayMatching({ x, y, width: w, height: h });
  const wa = display.workArea;
  let nx = Math.max(wa.x, Math.min(x, wa.x + wa.width - w));
  let ny = Math.max(wa.y, Math.min(y, wa.y + wa.height - h));
  mainWindow.setPosition(Math.round(nx), Math.round(ny), false);
});

// 渲染进程请求窗口边界信息
ipcMain.handle("get-window-bounds", () => {
  if (!mainWindow) return null;
  const [x, y] = mainWindow.getPosition();
  const [w, h] = mainWindow.getSize();
  const display = screen.getDisplayMatching({ x, y, width: w, height: h });
  return {
    x, y, width: w, height: h,
    workArea: display.workArea
  };
});

// 主进程代理调用大模型 API（避免渲染进程 CORS）
ipcMain.handle("ai-chat", async (event, { apiUrl, apiKey, model, messages }) => {
  try {
    const url = new URL(apiUrl.endsWith("/chat/completions") ? apiUrl : apiUrl.replace(/\/$/, "") + "/chat/completions");
    const body = JSON.stringify({
      model,
      messages,
      temperature: 0.8,
      max_tokens: 800
    });

    const options = {
      hostname: url.hostname,
      port: url.port || (url.protocol === "https:" ? 443 : 80),
      path: url.pathname + url.search,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "Content-Length": Buffer.byteLength(body)
      }
    };

    const lib = url.protocol === "https:" ? https : http;

    return new Promise((resolve, reject) => {
      const req = lib.request(options, (res) => {
        let data = "";
        res.on("data", chunk => data += chunk);
        res.on("end", () => {
          try {
            const json = JSON.parse(data);
            if (json.choices && json.choices[0] && json.choices[0].message) {
              resolve(json.choices[0].message.content);
            } else {
              reject(new Error(json.error?.message || "API 返回格式异常"));
            }
          } catch (e) {
            reject(new Error("解析响应失败: " + e.message));
          }
        });
      });
      req.on("error", (e) => reject(new Error("网络错误: " + e.message)));
      req.setTimeout(30000, () => { req.destroy(new Error("请求超时")); });
      req.write(body);
      req.end();
    });
  } catch (e) {
    throw new Error(e.message);
  }
});

/* -------------------- 扣子 Coze v3 对话 -------------------- */
// 通用 HTTP 请求，返回解析后的 JSON
function httpJson(method, fullUrl, headers, bodyObj) {
  return new Promise((resolve, reject) => {
    let url;
    try { url = new URL(fullUrl); } catch (e) { return reject(new Error("无效的 URL: " + fullUrl)); }
    const lib = url.protocol === "https:" ? https : http;
    const bodyStr = bodyObj ? JSON.stringify(bodyObj) : null;
    const options = {
      hostname: url.hostname,
      port: url.port || (url.protocol === "https:" ? 443 : 80),
      path: url.pathname + url.search,
      method,
      headers: Object.assign({
        "Content-Type": "application/json"
      }, headers || {})
    };
    if (bodyStr) options.headers["Content-Length"] = Buffer.byteLength(bodyStr);

    const req = lib.request(options, (res) => {
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error("响应解析失败（HTTP " + res.statusCode + "）"));
        }
      });
    });
    req.on("error", (e) => reject(new Error("网络错误: " + e.message)));
    req.setTimeout(30000, () => req.destroy(new Error("请求超时")));
    if (bodyStr) req.write(bodyStr);
    req.end();
  });
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// 扣子对话：发起 -> 轮询 -> 取答案
ipcMain.handle("coze-chat", async (event, { apiUrl, token, botId, query, conversationId }) => {
  const base = (apiUrl || "https://api.coze.cn").replace(/\/$/, "");
  const auth = { "Authorization": `Bearer ${token}` };

  // 1. 发起对话（复用 conversationId 以保持多轮上下文）
  const createUrl = base + "/v3/chat" + (conversationId ? `?conversation_id=${encodeURIComponent(conversationId)}` : "");
  const createBody = {
    bot_id: botId,
    user_id: "cloud-pet-owner",
    stream: false,
    auto_save_history: true,
    additional_messages: [
      { role: "user", content: query, content_type: "text" }
    ]
  };
  const createResp = await httpJson("POST", createUrl, auth, createBody);
  if (createResp.code !== 0 || !createResp.data) {
    throw new Error(createResp.msg || "扣子发起对话失败（code=" + createResp.code + "）");
  }
  const chatId = createResp.data.id;
  const convId = createResp.data.conversation_id;

  // 2. 轮询对话状态（每秒一次，最多 60 秒）
  let status = createResp.data.status;
  for (let i = 0; i < 60 && status !== "completed" && status !== "failed" && status !== "canceled" && status !== "requires_action"; i++) {
    await sleep(1000);
    const r = await httpJson("GET",
      `${base}/v3/chat/retrieve?conversation_id=${encodeURIComponent(convId)}&chat_id=${encodeURIComponent(chatId)}`,
      auth, null);
    if (r.code !== 0 || !r.data) {
      throw new Error(r.msg || "查询扣子对话状态失败");
    }
    status = r.data.status;
    if (status === "failed") {
      throw new Error(r.data.last_error?.msg || "扣子对话处理失败");
    }
  }
  if (status !== "completed") {
    throw new Error("扣子对话超时或未完成（status=" + status + "）");
  }

  // 3. 取消息列表，拼接 type=answer 的助手回复
  const listResp = await httpJson("GET",
    `${base}/v3/chat/message/list?conversation_id=${encodeURIComponent(convId)}&chat_id=${encodeURIComponent(chatId)}`,
    auth, null);
  if (listResp.code !== 0 || !Array.isArray(listResp.data)) {
    throw new Error(listResp.msg || "获取扣子回复失败");
  }
  const answers = listResp.data
    .filter(m => m.role === "assistant" && m.type === "answer" && m.content_type === "text")
    .map(m => m.content);
  const reply = answers.join("\n").trim();
  if (!reply) throw new Error("扣子未返回有效回复");
  return { reply, conversationId: convId };
});

// 退出应用
ipcMain.on("quit-app", () => {
  app.quit();
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
