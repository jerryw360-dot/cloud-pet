/**
 * 云桌宠 · Coze 聊天悬浮窗组件
 * ─────────────────────────────
 * 一行 <script> 即可在任意网站右下角接入 Coze 智能体聊天窗口。
 *
 * 用法（最简）:
 *   <script src="coze-chat-widget.js"></script>
 *   默认使用内置的 Coze Bot 配置。
 *
 * 自定义用法:
 *   <script>
 *     window.__COZE_CHAT_CONFIG__ = { botId: "你的BotID", token: "你的PAT" };
 *   </script>
 *   <script src="coze-chat-widget.js"></script>
 *
 * 注意：PAT Token 写在前端会暴露给用户浏览器。
 *   - 测试阶段可用 PAT。
 *   - 生产环境请改用 OAuth JWT 鉴权（参见 Coze 文档）。
 */

(function () {
  "use strict";

  // 内置默认配置（随包下发，开箱即用）
  var DEFAULTS = {
    botId: "7690842452521222153",
    token: "pat_aKvIBRJqWj3JqBMZMnQ7ggLK03kc9atYSL45KVFMsr7tkRa2FiJSnAJdWoeEaLPr",
    sdkUrl: "https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.2.0-beta.20/libs/cn/index.js"
  };

  // 允许页面通过全局变量覆盖配置
  var userCfg = window.__COZE_CHAT_CONFIG__ || {};

  // 动态计算组件脚本所在目录，用于解析图标等资源的绝对路径
  var scripts = document.getElementsByTagName("script");
  var selfSrc = "";
  for (var i = scripts.length - 1; i >= 0; i--) {
    var s = scripts[i];
    if (s.src && s.src.indexOf("coze-chat-widget.js") >= 0) { selfSrc = s.src; break; }
  }
  var baseDir = selfSrc ? selfSrc.substring(0, selfSrc.lastIndexOf("/") + 1) : "";

  var cfg = {
    botId: userCfg.botId || DEFAULTS.botId,
    token: userCfg.token || DEFAULTS.token,
    sdkUrl: userCfg.sdkUrl || DEFAULTS.sdkUrl,
    title: userCfg.title || "云桌宠助手",
    welcome: userCfg.welcome || "你好呀～我是云桌宠助手，有什么可以帮你的吗？",
    iconUrl: userCfg.iconUrl || (baseDir + "pet-default.png")
  };

  function loadScript(url, onload, onerror) {
    var s = document.createElement("script");
    s.src = url;
    s.async = true;
    s.onload = onload;
    s.onerror = onerror || function () {
      console.error("[CozeChat] SDK 加载失败:", url);
    };
    document.head.appendChild(s);
  }

  // 注入 CSS：聊天窗内的头像圆形化（img 标签）
  function injectRoundIconStyle() {
    var style = document.createElement("style");
    style.textContent = [
      "img[class*='coze'], img[class*='chat'], img[class*='avatar'], img[class*='bot'],",
      "div[class*='coze'] img, div[class*='chat'] img,",
      "[class*='coze-chat'] img, [class*='webchat'] img {",
      "  border-radius: 50% !important;",
      "  object-fit: cover !important;",
      "}",
      "[class*='coze'] [class*='icon'], [class*='coze'] [class*='avatar'],",
      "[class*='chat'] [class*='icon'], [class*='chat'] [class*='avatar'] {",
      "  border-radius: 50% !important;",
      "  overflow: hidden !important;",
      "}"
    ].join("\n");
    document.head.appendChild(style);
  }

  // 用 JS 强制把悬浮球设为圆形：监听 DOM，找 position:fixed 的小方形元素
  function forceRoundLauncher() {
    function roundify(node) {
      var el = (node && node.nodeType === 1) ? node : null;
      if (!el) return;
      // 检查自身及子元素
      var candidates = [el].concat(Array.prototype.slice.call(el.querySelectorAll ? el.querySelectorAll("*") : []));
      candidates.forEach(function (e) {
        var cs = window.getComputedStyle(e);
        if (cs.position !== "fixed") return;
        var w = parseFloat(cs.width) || 0;
        var h = parseFloat(cs.height) || 0;
        // 悬浮球特征：fixed 定位、宽高接近、尺寸在 30~90px 之间
        if (w >= 30 && w <= 90 && h >= 30 && h <= 90 && Math.abs(w - h) <= 10) {
          e.style.setProperty("border-radius", "50%", "important");
          e.style.setProperty("overflow", "hidden", "important");
        }
      });
    }

    // 初始扫描
    setTimeout(function () { roundify(document.body); }, 800);
    setTimeout(function () { roundify(document.body); }, 2000);

    // 持续监听 SDK 动态插入的元素
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        m.addedNodes.forEach(function (n) { roundify(n); });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
    // 30 秒后停止监听（悬浮球应该早已渲染）
    setTimeout(function () { observer.disconnect(); }, 30000);
  }

  function initChat() {
    if (typeof CozeWebSDK === "undefined" || !CozeWebSDK.WebChatClient) {
      console.error("[CozeChat] CozeWebSDK 未就绪");
      return;
    }
    injectRoundIconStyle();
    forceRoundLauncher();
    try {
      new CozeWebSDK.WebChatClient({
        // 智能体配置
        config: {
          bot_id: cfg.botId
        },
        // 鉴权（测试用 PAT，生产请换 OAuth）
        auth: {
          type: "token",
          token: cfg.token,
          // 可选：保存/刷新 token 的回调
          onSaveToken: function () {},
          onRefreshToken: function () { return Promise.resolve(cfg.token); }
        },
        // UI 定制（新版 Chat SDK 1.2.x 字段名）
        ui: {
          // 聊天窗口整体 UI（图标、标题等）
          base: {
            icon: cfg.iconUrl,      // 小助手图标（需企业版支持自定义）
            title: cfg.title
          },
          // 悬浮球
          asstBtn: {
            isNeed: true             // true=显示悬浮球
          },
          // 底部
          footer: {
            isNeed: false
          }
        },
        // 用户信息
        userInfo: {
          id: "web_guest_" + Date.now(),
          nickname: "访客"
        }
      });
      console.log("[CozeChat] 聊天窗已初始化, bot_id =", cfg.botId);
    } catch (e) {
      console.error("[CozeChat] 初始化失败:", e.message);
    }
  }

  // 页面加载完成后启动
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      loadScript(cfg.sdkUrl, initChat);
    });
  } else {
    loadScript(cfg.sdkUrl, initChat);
  }
})();
