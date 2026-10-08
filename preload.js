// preload.js - 安全桥接层
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("cloudPet", {
  platform: process.platform,
  versions: process.versions,
  // 调整窗口大小（桌面版专用，等待主进程完成缩放）
  resizeWindow: (width, height) =>
    ipcRenderer.invoke("resize-window", { width, height }),
  // 移动窗口（相对位移 dx, dy）
  moveWindow: (dx, dy) => {
    ipcRenderer.send("move-window", { dx, dy });
  },
  // 设置窗口绝对位置
  setWindowPosition: (x, y) => {
    ipcRenderer.send("set-window-position", { x, y });
  },
  // 获取窗口位置和屏幕尺寸（用于桌面版物理边界）
  getWindowBounds: () => ipcRenderer.invoke("get-window-bounds"),
  // AI 对话（主进程代理调用大模型 API）
  aiChat: (apiUrl, apiKey, model, messages) =>
    ipcRenderer.invoke("ai-chat", { apiUrl, apiKey, model, messages }),
  // 扣子 Coze 智能体对话（v3 三步流程）
  cozeChat: (apiUrl, token, botId, query, conversationId) =>
    ipcRenderer.invoke("coze-chat", { apiUrl, token, botId, query, conversationId }),
  // 退出应用
  quitApp: () => {
    ipcRenderer.send("quit-app");
  },
  // 拖拽区内右键（系统非客户区右键转发）
  onNativeContextMenu: (cb) => {
    ipcRenderer.on("native-context-menu", (e, pos) => cb(pos));
  },
  // 窗口失焦（点击窗口外桌面/其他应用）
  onWindowBlur: (cb) => {
    ipcRenderer.on("window-blur", () => cb());
  },
  // 拖拽区左键按下（OS 开始原生拖拽）
  onNativeDragStart: (cb) => {
    ipcRenderer.on("native-drag-start", () => cb());
  },
  // 拖拽区左键松开（携带起止屏幕坐标 DIP 和时间戳）
  onNativeDragEnd: (cb) => {
    ipcRenderer.on("native-drag-end", (e, d) => cb(d));
  }
});
