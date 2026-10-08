/* ============================================================
 * 云桌宠 · Cloud Pet  —  主逻辑
 * ============================================================ */

/* -------------------- 宠物 SVG 定义 -------------------- */
/* 每只宠物都是一个返回 SVG 字符串的函数，包含可动画的部位（眼睛等带 class） */

const PETS = {
  cat: {
    name: "小猫",
    emoji: "🐱",
    color: "#ffb347",
    svg: () => `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <!-- 耳朵 -->
      <path d="M55 70 L40 25 L85 55 Z" fill="#ffb347" stroke="#e89830" stroke-width="2" stroke-linejoin="round"/>
      <path d="M145 70 L160 25 L115 55 Z" fill="#ffb347" stroke="#e89830" stroke-width="2" stroke-linejoin="round"/>
      <path d="M58 62 L50 38 L76 56 Z" fill="#ffd9a8"/>
      <path d="M142 62 L150 38 L124 56 Z" fill="#ffd9a8"/>
      <!-- 身体 -->
      <ellipse cx="100" cy="120" rx="62" ry="55" fill="#ffb347" stroke="#e89830" stroke-width="2"/>
      <!-- 肚子 -->
      <ellipse cx="100" cy="135" rx="38" ry="32" fill="#ffe8c8"/>
      <!-- 脸 -->
      <ellipse cx="100" cy="95" rx="52" ry="46" fill="#ffb347" stroke="#e89830" stroke-width="2"/>
      <!-- 脸颊 -->
      <circle cx="72" cy="105" r="9" fill="#ff9f9f" opacity="0.6"/>
      <circle cx="128" cy="105" r="9" fill="#ff9f9f" opacity="0.6"/>
      <!-- 眼睛 -->
      <g class="eye">
        <ellipse cx="82" cy="88" rx="7" ry="9" fill="#2c2c3a"/>
        <circle cx="84" cy="85" r="2.5" fill="#fff"/>
      </g>
      <g class="eye">
        <ellipse cx="118" cy="88" rx="7" ry="9" fill="#2c2c3a"/>
        <circle cx="120" cy="85" r="2.5" fill="#fff"/>
      </g>
      <!-- 鼻子 -->
      <path d="M95 100 L105 100 L100 106 Z" fill="#ff8fb1"/>
      <!-- 嘴 -->
      <path d="M100 106 Q92 114 86 110" stroke="#2c2c3a" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M100 106 Q108 114 114 110" stroke="#2c2c3a" stroke-width="2" fill="none" stroke-linecap="round"/>
      <!-- 胡须 -->
      <g stroke="#2c2c3a" stroke-width="1.5" stroke-linecap="round">
        <line x1="55" y1="102" x2="35" y2="98"/>
        <line x1="55" y1="108" x2="35" y2="110"/>
        <line x1="145" y1="102" x2="165" y2="98"/>
        <line x1="145" y1="108" x2="165" y2="110"/>
      </g>
      <!-- 尾巴 -->
      <path d="M160 130 Q185 110 175 80" stroke="#ffb347" stroke-width="12" fill="none" stroke-linecap="round"/>
    </svg>`
  },

  dog: {
    name: "小狗",
    emoji: "🐶",
    color: "#c89b6c",
    svg: () => `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <!-- 耳朵 -->
      <ellipse cx="52" cy="65" rx="16" ry="32" fill="#a67c52" transform="rotate(-15 52 65)"/>
      <ellipse cx="148" cy="65" rx="16" ry="32" fill="#a67c52" transform="rotate(15 148 65)"/>
      <!-- 身体 -->
      <ellipse cx="100" cy="125" rx="60" ry="52" fill="#c89b6c" stroke="#a67c52" stroke-width="2"/>
      <!-- 肚子 -->
      <ellipse cx="100" cy="138" rx="36" ry="30" fill="#f0dcc4"/>
      <!-- 脸 -->
      <ellipse cx="100" cy="100" rx="50" ry="44" fill="#d4a878" stroke="#a67c52" stroke-width="2"/>
      <!-- 嘴部 -->
      <ellipse cx="100" cy="118" rx="28" ry="22" fill="#f0dcc4"/>
      <!-- 脸颊 -->
      <circle cx="70" cy="112" r="8" fill="#ff9f9f" opacity="0.5"/>
      <circle cx="130" cy="112" r="8" fill="#ff9f9f" opacity="0.5"/>
      <!-- 眼睛 -->
      <g class="eye">
        <circle cx="82" cy="92" r="8" fill="#2c2c3a"/>
        <circle cx="84" cy="89" r="2.8" fill="#fff"/>
      </g>
      <g class="eye">
        <circle cx="118" cy="92" r="8" fill="#2c2c3a"/>
        <circle cx="120" cy="89" r="2.8" fill="#fff"/>
      </g>
      <!-- 鼻子 -->
      <ellipse cx="100" cy="110" rx="7" ry="5" fill="#2c2c3a"/>
      <!-- 嘴 -->
      <path d="M100 115 L100 124" stroke="#2c2c3a" stroke-width="2" stroke-linecap="round"/>
      <path d="M100 124 Q92 130 86 126" stroke="#2c2c3a" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M100 124 Q108 130 114 126" stroke="#2c2c3a" stroke-width="2" fill="none" stroke-linecap="round"/>
      <!-- 舌头 -->
      <ellipse cx="100" cy="130" rx="5" ry="4" fill="#ff8fb1"/>
    </svg>`
  },

  bunny: {
    name: "小兔",
    emoji: "🐰",
    color: "#f5f5f5",
    svg: () => `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <!-- 长耳朵 -->
      <ellipse cx="78" cy="40" rx="11" ry="38" fill="#f5f5f5" stroke="#dcdcdc" stroke-width="2"/>
      <ellipse cx="122" cy="40" rx="11" ry="38" fill="#f5f5f5" stroke="#dcdcdc" stroke-width="2"/>
      <ellipse cx="78" cy="42" rx="5" ry="28" fill="#ffd6e0"/>
      <ellipse cx="122" cy="42" rx="5" ry="28" fill="#ffd6e0"/>
      <!-- 身体 -->
      <ellipse cx="100" cy="130" rx="58" ry="50" fill="#f5f5f5" stroke="#dcdcdc" stroke-width="2"/>
      <!-- 肚子 -->
      <ellipse cx="100" cy="140" rx="34" ry="28" fill="#fff5f8"/>
      <!-- 脸 -->
      <ellipse cx="100" cy="105" rx="48" ry="42" fill="#f5f5f5" stroke="#dcdcdc" stroke-width="2"/>
      <!-- 脸颊 -->
      <circle cx="72" cy="115" r="8" fill="#ffd6e0" opacity="0.8"/>
      <circle cx="128" cy="115" r="8" fill="#ffd6e0" opacity="0.8"/>
      <!-- 眼睛 -->
      <g class="eye">
        <ellipse cx="84" cy="100" rx="6" ry="8" fill="#2c2c3a"/>
        <circle cx="86" cy="97" r="2.2" fill="#fff"/>
      </g>
      <g class="eye">
        <ellipse cx="116" cy="100" rx="6" ry="8" fill="#2c2c3a"/>
        <circle cx="118" cy="97" r="2.2" fill="#fff"/>
      </g>
      <!-- 鼻子 -->
      <path d="M96 113 L104 113 L100 118 Z" fill="#ff8fb1"/>
      <!-- 嘴（Y形） -->
      <path d="M100 118 L100 124" stroke="#2c2c3a" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M100 124 Q94 128 90 124" stroke="#2c2c3a" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <path d="M100 124 Q106 128 110 124" stroke="#2c2c3a" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <!-- 小尾巴 -->
      <circle cx="155" cy="145" r="12" fill="#fff" stroke="#dcdcdc" stroke-width="2"/>
    </svg>`
  },

  hamster: {
    name: "仓鼠",
    emoji: "🐹",
    color: "#e8c39e",
    svg: () => `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <!-- 耳朵 -->
      <circle cx="60" cy="68" r="16" fill="#e8c39e" stroke="#c9a47a" stroke-width="2"/>
      <circle cx="140" cy="68" r="16" fill="#e8c39e" stroke="#c9a47a" stroke-width="2"/>
      <circle cx="60" cy="68" r="9" fill="#ffd6b8"/>
      <circle cx="140" cy="68" r="9" fill="#ffd6b8"/>
      <!-- 身体（圆滚滚） -->
      <ellipse cx="100" cy="120" rx="68" ry="60" fill="#e8c39e" stroke="#c9a47a" stroke-width="2"/>
      <!-- 肚子 -->
      <ellipse cx="100" cy="135" rx="44" ry="38" fill="#fff3e0"/>
      <!-- 脸 -->
      <ellipse cx="100" cy="100" rx="55" ry="48" fill="#eec9a8" stroke="#c9a47a" stroke-width="2"/>
      <!-- 鼓鼓的腮帮子 -->
      <circle cx="60" cy="112" r="18" fill="#fff3e0"/>
      <circle cx="140" cy="112" r="18" fill="#fff3e0"/>
      <!-- 脸颊红晕 -->
      <circle cx="62" cy="118" r="7" fill="#ff9f9f" opacity="0.6"/>
      <circle cx="138" cy="118" r="7" fill="#ff9f9f" opacity="0.6"/>
      <!-- 眼睛 -->
      <g class="eye">
        <circle cx="82" cy="95" r="7" fill="#2c2c3a"/>
        <circle cx="84" cy="92" r="2.4" fill="#fff"/>
      </g>
      <g class="eye">
        <circle cx="118" cy="95" r="7" fill="#2c2c3a"/>
        <circle cx="120" cy="92" r="2.4" fill="#fff"/>
      </g>
      <!-- 鼻子 -->
      <ellipse cx="100" cy="108" rx="4" ry="3" fill="#ff8fb1"/>
      <!-- 嘴 -->
      <path d="M100 111 Q95 117 91 113" stroke="#2c2c3a" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <path d="M100 111 Q105 117 109 113" stroke="#2c2c3a" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <!-- 小爪子 -->
      <ellipse cx="72" cy="165" rx="10" ry="7" fill="#e8c39e" stroke="#c9a47a" stroke-width="2"/>
      <ellipse cx="128" cy="165" rx="10" ry="7" fill="#e8c39e" stroke="#c9a47a" stroke-width="2"/>
    </svg>`
  },

  panda: {
    name: "熊猫",
    emoji: "🐼",
    color: "#ffffff",
    svg: () => `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <!-- 耳朵 -->
      <circle cx="58" cy="60" r="18" fill="#2c2c3a"/>
      <circle cx="142" cy="60" r="18" fill="#2c2c3a"/>
      <!-- 身体 -->
      <ellipse cx="100" cy="125" rx="62" ry="54" fill="#fff" stroke="#2c2c3a" stroke-width="2"/>
      <!-- 黑眼圈 -->
      <ellipse cx="82" cy="98" rx="14" ry="16" fill="#2c2c3a" transform="rotate(-15 82 98)"/>
      <ellipse cx="118" cy="98" rx="14" ry="16" fill="#2c2c3a" transform="rotate(15 118 98)"/>
      <!-- 脸 -->
      <ellipse cx="100" cy="100" rx="54" ry="48" fill="#fff" stroke="#2c2c3a" stroke-width="2"/>
      <!-- 脸颊 -->
      <circle cx="68" cy="112" r="8" fill="#ff9f9f" opacity="0.5"/>
      <circle cx="132" cy="112" r="8" fill="#ff9f9f" opacity="0.5"/>
      <!-- 眼睛 -->
      <g class="eye">
        <circle cx="82" cy="100" r="6" fill="#fff"/>
        <circle cx="82" cy="100" r="3.5" fill="#2c2c3a"/>
      </g>
      <g class="eye">
        <circle cx="118" cy="100" r="6" fill="#fff"/>
        <circle cx="118" cy="100" r="3.5" fill="#2c2c3a"/>
      </g>
      <!-- 鼻子 -->
      <ellipse cx="100" cy="115" rx="6" ry="4" fill="#2c2c3a"/>
      <!-- 嘴 -->
      <path d="M100 119 L100 126" stroke="#2c2c3a" stroke-width="2" stroke-linecap="round"/>
      <path d="M100 126 Q92 132 86 128" stroke="#2c2c3a" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M100 126 Q108 132 114 128" stroke="#2c2c3a" stroke-width="2" fill="none" stroke-linecap="round"/>
      <!-- 手臂 -->
      <ellipse cx="45" cy="135" rx="16" ry="12" fill="#2c2c3a"/>
      <ellipse cx="155" cy="135" rx="16" ry="12" fill="#2c2c3a"/>
    </svg>`
  }
};

/* -------------------- 对话内容库 -------------------- */
const PHRASES = {
  idle: [
    "今天也要元气满满哦～",
    "主人在忙什么呢？",
    "好无聊呀，陪陪我嘛～",
    "我在盯着你看哦 👀",
    "今天天气真不错呢",
    "嘿嘿，想起了开心的事",
    "我是不是很可爱呀？",
    "偷偷告诉你，我喜欢你哦～"
  ],
  pet: [
    "嘿嘿，好舒服～",
    "再摸摸嘛～",
    "嘻嘻，痒死啦！",
    "主人最好了 ❤️",
    "我最喜欢被摸头了"
  ],
  feed: [
    "好吃好吃！😋",
    "谢谢主人～",
    "吃饱饱啦～",
    "这个真好吃！再来一个嘛"
  ],
  play: [
    "好开心呀！🎉",
    "再来再来！",
    "玩得真尽兴～",
    "嘿嘿，接住啦！"
  ],
  sleep: [
    "呼呼...晚安 💤",
    "好困啊，让我睡一会",
    "做个好梦..."
  ],
  hungry: [
    "肚子咕咕叫了...",
    "主人，我饿了 🥺",
    "什么时候开饭呀？"
  ],
  tired: [
    "好累呀...",
    "让我歇一会嘛",
    "眼皮好重..."
  ],
  sad: [
    "呜...不开心",
    "陪陪我好不好...",
    "有点孤单..."
  ]
};

/* -------------------- 状态管理 -------------------- */
const STORAGE_KEY = "cloud-pet-settings";

const state = {
  petType: "cat",
  petName: "小橘",
  mood: 80,
  hunger: 70,
  energy: 80,
  sound: true,
  decay: true,
  sleeping: false,
  customPetImg: null,   // 自定义宠物图片（base64）
  tasks: [],            // 任务列表
  pomodoroCount: 0,     // 已完成番茄数
  aiProvider: "openai",  // AI 平台：openai | coze
  aiApiUrl: "https://api.deepseek.com",  // 大模型 API 地址（默认 DeepSeek）
  aiModel: "deepseek-chat",              // 模型名（DeepSeek 对话模型）
  aiApiKey: "",                          // API Key（需自行填入）
  cozeApiUrl: "https://api.coze.cn",     // 扣子 API 地址（国内版）
  cozeBotId: "",                         // 扣子智能体 Bot ID
  cozeToken: ""                          // 扣子访问令牌 pat_
};

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved) {
      Object.assign(state, saved);
      // 兼容旧版空配置：补全 DeepSeek 默认地址和模型
      if (!state.aiApiUrl) state.aiApiUrl = "https://api.deepseek.com";
      if (!state.aiModel) state.aiModel = "deepseek-chat";
      if (!state.aiProvider) state.aiProvider = "openai";
      if (!state.cozeApiUrl) state.cozeApiUrl = "https://api.coze.cn";
      // 已配置扣子智能体（Bot ID + Token）时，默认使用 Coze 聊天
      if (state.cozeBotId && state.cozeToken) state.aiProvider = "coze";
    }
  } catch (e) {}
}
function saveState() {
  const toSave = {
    petType: state.petType,
    petName: state.petName,
    sound: state.sound,
    decay: state.decay,
    customPetImg: state.customPetImg,
    tasks: state.tasks,
    pomodoroCount: state.pomodoroCount,
    aiApiUrl: state.aiApiUrl,
    aiModel: state.aiModel,
    aiApiKey: state.aiApiKey,
    aiProvider: state.aiProvider,
    cozeApiUrl: state.cozeApiUrl,
    cozeBotId: state.cozeBotId,
    cozeToken: state.cozeToken
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
}

/* -------------------- DOM 引用 -------------------- */
const $ = (id) => document.getElementById(id);
const petEl = $("pet");
const petBody = $("petBody");
const bubble = $("bubble");
const fxLayer = $("fxLayer");
const stage = $("stage");

/* -------------------- 渲染宠物 -------------------- */
function renderPet() {
  if (state.customPetImg) {
    // 使用用户上传的图片
    petBody.innerHTML = `<img src="${state.customPetImg}" alt="pet" />`;
    petEl.classList.add("custom-img");
  } else {
    petEl.classList.remove("custom-img");
    const pet = PETS[state.petType];
    petBody.innerHTML = pet.svg();
  }
  document.title = `${state.petName} · 云桌宠`;
}

/* -------------------- 对话气泡 -------------------- */
let bubbleTimer = null;
function say(category) {
  const list = PHRASES[category] || PHRASES.idle;
  const text = list[Math.floor(Math.random() * list.length)];
  bubble.textContent = text;
  bubble.classList.add("show");
  clearTimeout(bubbleTimer);
  bubbleTimer = setTimeout(() => bubble.classList.remove("show"), 2800);
}

/* -------------------- 漂浮特效 -------------------- */
function spawnFx(emoji, count = 1, zig = false) {
  const rect = petEl.getBoundingClientRect();
  for (let i = 0; i < count; i++) {
    const fx = document.createElement("div");
    fx.className = "fx" + (zig ? " zig" : "");
    fx.textContent = emoji;
    const offsetX = (Math.random() - 0.5) * 80;
    const offsetY = -20 - Math.random() * 30;
    fx.style.left = (rect.left + rect.width / 2 + offsetX) + "px";
    fx.style.top = (rect.top + rect.height / 2 + offsetY) + "px";
    fx.style.animationDelay = (i * 0.08) + "s";
    fxLayer.appendChild(fx);
    setTimeout(() => fx.remove(), 1800);
  }
}

/* -------------------- 音效（Web Audio 合成） -------------------- */
let audioCtx = null;
function playSound(type) {
  if (!state.sound) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const presets = {
      pet:    { freq: 660, type: "sine",     dur: 0.12, slide: 880 },
      feed:   { freq: 520, type: "triangle", dur: 0.18, slide: 780 },
      play:   { freq: 740, type: "square",   dur: 0.1,  slide: 980 },
      sleep:  { freq: 300, type: "sine",     dur: 0.4,  slide: 180 },
      talk:   { freq: 500, type: "sine",     dur: 0.08, slide: 600 },
      error:  { freq: 200, type: "sawtooth", dur: 0.2,  slide: 120 },
      alert:  { freq: 880, type: "sine",     dur: 0.15, slide: 1100 }
    };
    const p = presets[type] || presets.talk;
    osc.type = p.type;
    osc.frequency.setValueAtTime(p.freq, now);
    osc.frequency.exponentialRampToValueAtTime(p.slide, now + p.dur);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.18, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + p.dur);
    osc.start(now);
    osc.stop(now + p.dur + 0.05);
  } catch (e) {}
}

/* -------------------- 数值更新 -------------------- */
function clamp(v, min = 0, max = 100) { return Math.max(min, Math.min(max, v)); }

function updateBars() {
  const mood = $("ctxMoodBar");
  const hunger = $("ctxHungerBar");
  const energy = $("ctxEnergyBar");
  if (mood) mood.style.width = state.mood + "%";
  if (hunger) hunger.style.width = state.hunger + "%";
  if (energy) energy.style.width = state.energy + "%";
}

function addStat(field, amount) {
  state[field] = clamp(state[field] + amount);
  updateBars();
}

/* -------------------- 行为状态切换 -------------------- */
function setPetClass(cls, duration) {
  petEl.classList.add(cls);
  if (duration) {
    setTimeout(() => petEl.classList.remove(cls), duration);
  }
}

function isSleeping() { return petEl.classList.contains("sleeping"); }

/* -------------------- 互动动作 -------------------- */
const actions = {
  pet() {
    if (isSleeping()) { say("sleep"); return; }
    setPetClass("petting", 350);
    addStat("mood", 8);
    addStat("energy", -2);
    spawnFx("❤️", 3, true);
    spawnFx("✨", 1);
    say("pet");
    playSound("pet");
  },
  feed() {
    if (isSleeping()) { say("sleep"); return; }
    if (state.hunger >= 98) { say("我已经饱啦～"); playSound("error"); return; }
    setPetClass("happy", 700);
    addStat("hunger", 20);
    addStat("mood", 3);
    spawnFx("🍖", 1);
    setTimeout(() => spawnFx("😋", 1), 300);
    say("feed");
    playSound("feed");
  },
  play() {
    if (isSleeping()) { say("sleep"); return; }
    if (state.energy < 10) { say("tired"); playSound("error"); return; }
    setPetClass("happy", 900);
    setPetClass("walking", 900);
    addStat("mood", 12);
    addStat("energy", -12);
    addStat("hunger", -5);
    spawnFx("🎾", 2, true);
    spawnFx("⭐", 2);
    say("play");
    playSound("play");
  },
  sleep() {
    if (isSleeping()) {
      petEl.classList.remove("sleeping");
      say("睡醒啦，精神满满！");
      playSound("talk");
      return;
    }
    petEl.classList.add("sleeping");
    addStat("energy", 20);
    spawnFx("💤", 2);
    say("sleep");
    playSound("sleep");
  },
  talk() {
    if (isSleeping()) { say("sleep"); return; }
    // 打开 AI 聊天面板
    openChat();
  }
};

/* -------------------- 拖拽 + 物理抛掷 -------------------- */
let drag = {
  active: false,
  startX: 0, startY: 0,
  origX: 0, origY: 0,
  moved: false,
  // 速度追踪
  lastX: 0, lastY: 0, lastT: 0,
  vx: 0, vy: 0
};

// 物理状态
let physics = {
  running: false,
  vx: 0, vy: 0,
  gravity: 0.6,        // 重力加速度
  bounce: 0.75,        // 垂直反弹系数（越高弹力越大，由下落速度决定）
  friction: 0.98,      // 水平摩擦
  groundBounce: 0.6,   // 基础地面反弹系数
  minSpeed: 0.5        // 低于此速度停止
};

function getPetPos() {
  const rect = petEl.getBoundingClientRect();
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}

function onPointerDown(e) {
  // 桌面版：窗口移动交给系统原生拖拽（-webkit-app-region: drag），不走 JS 拖拽
  if (isDesktop()) return;
  // 不处理模态框和菜单内的点击
  if (e.target.closest(".modal") || e.target.closest(".context-menu")) return;
  if (e.target.closest(".pet") !== petEl) return;
  // 右键交给 contextmenu 处理
  if (e.button === 2) return;
  // 停止正在进行的物理动画
  stopPhysics();

  drag.active = true;
  drag.moved = false;
  drag.startX = e.clientX;
  drag.startY = e.clientY;
  drag.lastX = e.clientX;
  drag.lastY = e.clientY;
  drag.lastT = performance.now();
  drag.vx = 0;
  drag.vy = 0;
  // 桌面版：记录窗口起始位置
  if (isDesktop()) {
    drag.winStartX = null; // 将在第一次 move 时获取
    drag.winStartY = null;
    // rAF 合并位移：高轮询率鼠标一帧内会产生多个 pointermove，
    // 累加后每帧只发一次 setPosition，避免透明窗口高频移动闪烁
    drag.pendingX = 0;
    drag.pendingY = 0;
    drag.moveRaf = 0;
  } else {
    const p = getPetPos();
    drag.origX = p.x;
    drag.origY = p.y;
  }
  petEl.classList.add("dragging");
  petEl.setPointerCapture?.(e.pointerId);
}

function onPointerMove(e) {
  if (!drag.active) return;
  const dx = e.clientX - drag.startX;
  const dy = e.clientY - drag.startY;
  if (Math.abs(dx) > 3 || Math.abs(dy) > 3) drag.moved = true;

  // 本次增量（用于桌面版移动窗口）
  const ddx = e.clientX - drag.lastX;
  const ddy = e.clientY - drag.lastY;

  // 计算瞬时速度（像素/毫秒）
  const now = performance.now();
  const dt = now - drag.lastT;
  if (dt > 0) {
    drag.vx = ddx / dt;
    drag.vy = ddy / dt;
  }
  drag.lastX = e.clientX;
  drag.lastY = e.clientY;
  drag.lastT = now;

  if (isDesktop()) {
    // 桌面版：累加本帧位移，rAF 中一次性移动整个窗口
    drag.pendingX += ddx;
    drag.pendingY += ddy;
    if (!drag.moveRaf) {
      drag.moveRaf = requestAnimationFrame(() => {
        drag.moveRaf = 0;
        const px = drag.pendingX, py = drag.pendingY;
        drag.pendingX = 0;
        drag.pendingY = 0;
        if ((px || py) && drag.active && window.cloudPet && window.cloudPet.moveWindow) {
          window.cloudPet.moveWindow(px, py);
        }
      });
    }
  } else {
    // Web 版：在窗口内移动 DOM
    let nx = drag.origX + dx;
    let ny = drag.origY + dy;
    const view = e.view || window;
    const w = petEl.offsetWidth / 2;
    const h = petEl.offsetHeight / 2;
    nx = clamp(nx, w + 10, view.innerWidth - w - 10);
    ny = clamp(ny, h + 10, view.innerHeight - h - 10);
    petEl.style.left = nx + "px";
    petEl.style.top = ny + "px";
    petEl.style.transform = "translate(-50%, -50%)";
  }
}

function onPointerUp(e) {
  if (!drag.active) return;
  drag.active = false;
  petEl.classList.remove("dragging");
  petEl.releasePointerCapture?.(e.pointerId);

  // 桌面版：立即冲刷本帧尚未提交的位移，避免松手时窗口滞后一帧
  if (isDesktop()) {
    if (drag.moveRaf) {
      cancelAnimationFrame(drag.moveRaf);
      drag.moveRaf = 0;
    }
    if ((drag.pendingX || drag.pendingY) && window.cloudPet && window.cloudPet.moveWindow) {
      window.cloudPet.moveWindow(drag.pendingX, drag.pendingY);
    }
    drag.pendingX = 0;
    drag.pendingY = 0;
  }

  // 没有移动则视为点击抚摸
  if (!drag.moved) {
    actions.pet();
    return;
  }

  // 有移动 -> 启动物理抛掷
  // 速度放大系数（像素/毫秒 -> 像素/帧），让抛掷更明显
  const speedScale = 16;
  const throwVx = drag.vx * speedScale;
  const throwVy = drag.vy * speedScale;

  // 只在有一定速度时才抛掷，否则就停在原地
  const speed = Math.sqrt(throwVx * throwVx + throwVy * throwVy);
  if (speed > 2) {
    startPhysics(throwVx, throwVy);
  }
}

/* -------------------- 桌面版：系统原生拖拽 --------------------
 * pet 带 -webkit-app-region:drag，左键在该区域按下会进入 Windows 模态
 * 移动循环（单击不位移也会进出），渲染进程收不到任何鼠标事件；主进程
 * hook WM_ENTERSIZEMOVE/WM_MOVE/WM_EXITSIZEMOVE 后转发起止点与速度，
 * 由这里判定抚摸 / 抛掷 / 原地停留。
 */
function setupDesktopNativeDrag() {
  if (!isDesktop()) return;
  const cp = window.cloudPet;

  // 拖拽区（宠物本体）上的右键：主进程转发屏幕坐标
  if (cp?.onNativeContextMenu) {
    cp.onNativeContextMenu(async (pos) => {
      const b = await cp.getWindowBounds();
      // 屏幕 DIP 坐标 -> 窗口内 CSS 坐标（bounds 同为 DIP）
      showContextMenu(pos.x - b.x, pos.y - b.y);
    });
  }

  // 点击窗口外（桌面/其他应用）导致窗口失焦时，收起右键菜单并缩回窗口
  if (cp?.onWindowBlur) {
    cp.onWindowBlur(() => {
      if (!contextMenu.classList.contains("hidden")) hideContextMenu();
    });
  }

  if (cp?.onNativeDragStart) {
    cp.onNativeDragStart(() => {
      // 收起已打开的右键菜单；抓住正在弹跳的宠物
      if (!contextMenu.classList.contains("hidden")) hideContextMenu();
      stopPhysics();
      petEl.classList.add("dragging");
    });
  }

  if (cp?.onNativeDragEnd) {
    cp.onNativeDragEnd((d) => {
      petEl.classList.remove("dragging");
      const dist = Math.hypot(d.x - d.sx, d.y - d.sy);
      const dur = d.t1 - d.t0;

      // 单击：位移很小（容忍进出移动循环间的光标抖动）或短按且位移不超过 12px
      if (dist <= 8 || (dur <= 300 && dist <= 12)) {
        petOnce();
        return;
      }
      // 用主进程按松手前光标轨迹算出的速度估算抛掷初速度
      const speedScale = 16;
      const vx = d.vx * speedScale;
      const vy = d.vy * speedScale;
      if (Math.hypot(vx, vy) > 2) {
        startPhysics(vx, vy);
        return;
      }
      // 慢速拖动后松手：停在新位置，并钳制回屏幕工作区
      clampWindowToWorkArea();
    });
  }

  // 兜底：快速连点若被系统合并为双击，个别环境仍会以 DOM dblclick 到达
  petEl.addEventListener("dblclick", () => {
    petOnce();
  });
}

// 抚摸防重入：同一次点击/双击可能从多条路径到达，300ms 内只响应一次
let lastPetAt = 0;
function petOnce() {
  const now = performance.now();
  if (now - lastPetAt < 300) return;
  lastPetAt = now;
  actions.pet();
}

// 把窗口位置限制在当前显示器工作区内
async function clampWindowToWorkArea() {
  if (!isDesktop() || !window.cloudPet?.getWindowBounds) return;
  const b = await window.cloudPet.getWindowBounds();
  if (!b || !b.workArea) return;
  const wa = b.workArea;
  const nx = Math.max(wa.x, Math.min(b.x, wa.x + wa.width - b.width));
  const ny = Math.max(wa.y, Math.min(b.y, wa.y + wa.height - b.height));
  if (nx !== b.x || ny !== b.y) {
    window.cloudPet.setWindowPosition(Math.round(nx), Math.round(ny));
  }
}

/* -------------------- 物理动画（重力 + 弹跳） -------------------- */
let physicsRAF = null;
let squashUntil = 0; // 挤压动画结束时间戳

function startPhysics(vx, vy) {
  stopPhysics();
  physics.running = true;
  physics.vx = vx;
  physics.vy = vy;
  squashUntil = 0;
  petEl.classList.add("physics");

  if (isDesktop() && window.cloudPet && window.cloudPet.getWindowBounds) {
    // 桌面版：移动整个窗口，边界为屏幕工作区
    window.cloudPet.getWindowBounds().then((bounds) => {
      if (!bounds) return;
      let winX = bounds.x;
      let winY = bounds.y;
      const winW = bounds.width;
      const winH = bounds.height;
      const wa = bounds.workArea;

      function loop() {
        if (!physics.running) return;

        // 应用重力
        physics.vy += physics.gravity;
        winX += physics.vx;
        winY += physics.vy;

        // 左右墙壁碰撞
        if (winX < wa.x) {
          winX = wa.x;
          physics.vx = -physics.vx * 0.6;
        } else if (winX > wa.x + wa.width - winW) {
          winX = wa.x + wa.width - winW;
          physics.vx = -physics.vx * 0.6;
        }

        // 天花板碰撞
        if (winY < wa.y) {
          winY = wa.y;
          physics.vy = -physics.vy * 0.5;
        }

        // 地面碰撞 -> 弹跳
        const ground = wa.y + wa.height - winH;
        if (winY > ground) {
          winY = ground;
          const impactSpeed = Math.abs(physics.vy);
          const bounceFactor = Math.min(0.9, physics.groundBounce + impactSpeed * 0.012);
          physics.vy = -physics.vy * bounceFactor;
          physics.vx *= physics.friction;

          if (impactSpeed > 4) {
            spawnLandingDust(winX + winW / 2, ground + winH);
            squashUntil = performance.now() + 130;
          }
        }

        window.cloudPet.setWindowPosition(Math.round(winX), Math.round(winY));

        // 挤压动画
        if (squashUntil > 0 && performance.now() < squashUntil) {
          petEl.style.transform = "translate(-50%, -50%) scaleX(1.3) scaleY(0.7)";
        } else {
          squashUntil = 0;
          petEl.style.transform = "translate(-50%, -50%)";
        }

        const totalSpeed = Math.sqrt(physics.vx * physics.vx + physics.vy * physics.vy);
        if (totalSpeed < physics.minSpeed && winY >= ground - 2) {
          stopPhysics();
          petEl.style.transform = "";
          return;
        }

        physicsRAF = requestAnimationFrame(loop);
      }

      physicsRAF = requestAnimationFrame(loop);
    });
    return;
  }

  // Web 版：在窗口内移动 DOM
  function loop() {
    if (!physics.running) return;

    const rect = petEl.getBoundingClientRect();
    const w = rect.width / 2;
    const h = rect.height / 2;
    let x = rect.left + w;
    let y = rect.top + h;

    // 应用重力
    physics.vy += physics.gravity;

    // 更新位置
    x += physics.vx;
    y += physics.vy;

    // 边界与碰撞
    const viewW = window.innerWidth;
    const viewH = window.innerHeight;

    // 左右墙壁碰撞
    if (x < w + 10) {
      x = w + 10;
      physics.vx = -physics.vx * 0.6;
    } else if (x > viewW - w - 10) {
      x = viewW - w - 10;
      physics.vx = -physics.vx * 0.6;
    }

    // 天花板碰撞
    if (y < h + 10) {
      y = h + 10;
      physics.vy = -physics.vy * 0.5;
    }

    // 地面碰撞 -> 弹跳
    const ground = viewH - h - 10;
    if (y > ground) {
      y = ground;
      const impactSpeed = Math.abs(physics.vy);
      // 弹力与下落速度相关：速度越大，反弹越高
      const bounceFactor = Math.min(0.9, physics.groundBounce + impactSpeed * 0.012);
      physics.vy = -physics.vy * bounceFactor;
      physics.vx *= physics.friction;

      // 落地特效
      if (impactSpeed > 4) {
        spawnLandingDust(x, ground + h);
        squashUntil = performance.now() + 130; // 挤压持续 130ms
      }
    }

    // 应用位置
    petEl.style.left = x + "px";
    petEl.style.top = y + "px";

    // 处理挤压动画：落地时压扁，之后恢复
    if (squashUntil > 0 && performance.now() < squashUntil) {
      petEl.style.transform = "translate(-50%, -50%) scaleX(1.3) scaleY(0.7)";
    } else {
      squashUntil = 0;
      petEl.style.transform = "translate(-50%, -50%)";
    }

    // 当速度很小时停止
    const totalSpeed = Math.sqrt(physics.vx * physics.vx + physics.vy * physics.vy);
    if (totalSpeed < physics.minSpeed && y >= ground - 2) {
      stopPhysics();
      petEl.style.transform = "";
      return;
    }

    physicsRAF = requestAnimationFrame(loop);
  }

  physicsRAF = requestAnimationFrame(loop);
}

function stopPhysics() {
  physics.running = false;
  if (physicsRAF) {
    cancelAnimationFrame(physicsRAF);
    physicsRAF = null;
  }
  petEl.classList.remove("physics");
}

// 落地尘土特效
function spawnLandingDust(x, y) {
  for (let i = 0; i < 6; i++) {
    const dust = document.createElement("div");
    const size = 6 + Math.random() * 8;
    const dir = i % 2 === 0 ? -1 : 1;
    dust.style.cssText = `
      position: fixed;
      left: ${x + dir * (5 + Math.random() * 20)}px;
      top: ${y - size / 2}px;
      width: ${size}px;
      height: ${size}px;
      background: rgba(180, 180, 180, 0.7);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9998;
      transition: all 0.5s ease-out;
    `;
    document.body.appendChild(dust);
    requestAnimationFrame(() => {
      dust.style.left = (x + dir * (20 + Math.random() * 40)) + "px";
      dust.style.top = (y - 10 - Math.random() * 20) + "px";
      dust.style.opacity = "0";
      dust.style.transform = "scale(0.3)";
    });
    setTimeout(() => dust.remove(), 500);
  }
}

petEl.addEventListener("pointerdown", onPointerDown);
window.addEventListener("pointermove", onPointerMove);
window.addEventListener("pointerup", onPointerUp);

/* -------------------- 右键上下文菜单 -------------------- */
const contextMenu = $("contextMenu");

// 桌面版：调整窗口大小以容纳菜单
async function resizeForMenu(show) {
  if (!isDesktop()) return;
  if (window.cloudPet && typeof window.cloudPet.resizeWindow === "function") {
    if (show) {
      await window.cloudPet.resizeWindow(260, 540);
    } else {
      await window.cloudPet.resizeWindow(180, 180);
    }
  }
}

// 桌面版：调整窗口大小以容纳设置/帮助模态框
async function resizeForModal(show) {
  if (!isDesktop()) return;
  if (window.cloudPet && typeof window.cloudPet.resizeWindow === "function") {
    if (show) {
      await window.cloudPet.resizeWindow(460, 620);
    } else {
      await window.cloudPet.resizeWindow(180, 180);
    }
  }
}

// 等待渲染端视口真正达到目标宽度（resize 事件 + 两帧），再执行内容渲染。
// invoke 返回只代表主进程 setSize 完成，渲染端 innerWidth 此时可能仍是旧值。
function waitForViewportWidth(targetW, timeout = 500) {
  return new Promise((resolve) => {
    if (window.innerWidth >= targetW) {
      requestAnimationFrame(() => requestAnimationFrame(resolve));
      return;
    }
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      window.removeEventListener("resize", onResize);
      requestAnimationFrame(() => requestAnimationFrame(resolve));
    };
    const onResize = () => { if (window.innerWidth >= targetW) finish(); };
    window.addEventListener("resize", onResize);
    setTimeout(finish, timeout);
  });
}

function showContextMenu(x, y) {
  updateBars();
  $("ctxName").textContent = state.petName;
  contextMenu.classList.remove("hidden");
  // 桌面版先放大窗口
  resizeForMenu(true);

  const positionMenu = () => {
    // 先放开高度限制，测量菜单内容真实高度
    contextMenu.style.maxHeight = "none";
    const contentH = contextMenu.scrollHeight;
    const menuW = contextMenu.getBoundingClientRect().width;
    const winW = window.innerWidth;
    const winH = window.innerHeight;
    // 菜单可见高度 = min(内容高, 窗口可用高)，与设置页面一致：容器完整可见、内容内部滚动
    const menuH = Math.min(contentH, winH - 20);

    let left = x;
    let top = y;
    if (left + menuW > winW - 10) left = winW - menuW - 10;
    if (top + menuH > winH - 10) top = winH - menuH - 10;
    if (left < 10) left = 10;
    if (top < 10) top = 10;

    contextMenu.style.maxHeight = menuH + "px";
    contextMenu.style.left = left + "px";
    contextMenu.style.top = top + "px";
  };

  if (isDesktop()) {
    // 窗口 resize 是异步 IPC，监听 resize 事件后定位，超时兜底
    let positioned = false;
    const onResized = () => {
      if (positioned) return;
      positioned = true;
      window.removeEventListener("resize", onResized);
      positionMenu();
    };
    window.addEventListener("resize", onResized);
    setTimeout(onResized, 300);
  } else {
    positionMenu();
  }
}

function hideContextMenu() {
  contextMenu.classList.add("hidden");
  // 桌面版缩回窗口
  resizeForMenu(false);
}

// 右键宠物弹出菜单
petEl.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  showContextMenu(e.clientX, e.clientY);
});

// 点击其他地方关闭菜单
document.addEventListener("pointerdown", (e) => {
  if (!contextMenu.classList.contains("hidden") &&
      !e.target.closest(".context-menu")) {
    hideContextMenu();
  }
});

// 菜单项点击
contextMenu.addEventListener("click", (e) => {
  const item = e.target.closest(".ctx-item");
  if (!item) return;
  const action = item.dataset.action;
  hideContextMenu();
  if (actions[action]) {
    actions[action]();
  } else if (action === "settings") {
    // 置顶模式下先还原再打开设置
    if (pipWindow) {
      const wasPip = pipWindow;
      wasPip.close();
      setTimeout(openSettings, 100);
    } else {
      openSettings();
    }
  } else if (action === "tasks") {
    openTasks();
  } else if (action === "pomodoro") {
    openPomodoro();
  } else if (action === "help") {
    if (pipWindow) {
      const wasPip = pipWindow;
      wasPip.close();
      setTimeout(() => { resizeForModal(true); $("helpModal").classList.remove("hidden"); }, 100);
    } else {
      resizeForModal(true);
      $("helpModal").classList.remove("hidden");
    }
  } else if (action === "pip") {
    togglePiP();
  } else if (action === "quit") {
    quitApp();
  }
  // "close-menu" 无需额外处理：上方 hideContextMenu() 已在分支前统一收起菜单并缩回窗口
});

// 退出应用
function quitApp() {
  if (isDesktop() && window.cloudPet && window.cloudPet.quitApp) {
    say("主人再见啦～");
    setTimeout(() => window.cloudPet.quitApp(), 600);
  } else {
    // Web 版无法主动关闭浏览器标签页
    say("Web 版直接关闭浏览器标签页就可以啦～");
    playSound("talk");
  }
}

/* -------------------- 置顶显示 (Document Picture-in-Picture) -------------------- */
let pipWindow = null;
let pipRestoreEl = null; // 占位元素，用于还原位置

function isPipSupported() {
  return "documentPictureInPicture" in window;
}

async function togglePiP() {
  if (pipWindow) {
    // 已在置顶窗口，关闭它
    pipWindow.close();
    return;
  }
  if (!isPipSupported()) {
    say("当前浏览器不支持置顶显示，请使用 Chrome 116+");
    playSound("error");
    return;
  }
  try {
    pipWindow = await window.documentPictureInPicture.requestWindow({
      width: 160,
      height: 160
    });

    // 设置窗口标题为空，减少窗口感
    pipWindow.document.title = "";

    // 复制所有样式表到 PiP 窗口
    const styleSheets = Array.from(document.styleSheets);
    for (const sheet of styleSheets) {
      try {
        const rules = Array.from(sheet.cssRules).map(r => r.cssText).join("\n");
        const style = pipWindow.document.createElement("style");
        style.textContent = rules;
        pipWindow.document.head.appendChild(style);
      } catch (e) {
        // 跨域样式表无法读取，尝试用 link 引入
        if (sheet.href) {
          const link = pipWindow.document.createElement("link");
          link.rel = "stylesheet";
          link.href = sheet.href;
          pipWindow.document.head.appendChild(link);
        }
      }
    }

    // 让 html 和 body 完全透明，只显示宠物
    const pipDoc = pipWindow.document;
    pipDoc.documentElement.style.background = "transparent";
    pipDoc.body.style.background = "transparent";
    pipDoc.body.style.margin = "0";
    pipDoc.body.style.padding = "0";
    pipDoc.body.style.overflow = "hidden";
    pipDoc.body.style.border = "none";
    pipDoc.body.classList.add("pip-mode");

    // 在原位置插入占位元素，方便还原
    pipRestoreEl = document.createElement("div");
    pipRestoreEl.id = "pipRestore";
    petEl.parentNode.insertBefore(pipRestoreEl, petEl);

    // 把宠物、气泡、特效层一起移入 PiP 窗口
    const pipContainer = pipDoc.createElement("div");
    pipContainer.style.cssText = "position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:transparent;";
    pipDoc.body.appendChild(pipContainer);

    // 将宠物移入 PiP 窗口
    pipContainer.appendChild(petEl);
    pipContainer.appendChild(fxLayer);
    pipContainer.appendChild(contextMenu);
    // fx-layer 需要覆盖全屏
    fxLayer.style.position = "fixed";
    fxLayer.style.inset = "0";

    // 调整宠物在 PiP 窗口内的定位
    petEl.style.position = "relative";
    petEl.style.left = "auto";
    petEl.style.top = "auto";
    petEl.style.transform = "none";

    // 更新菜单项文案
    updatePiPMenuLabel(true);

    // PiP 窗口关闭时还原
    pipWindow.addEventListener("pagehide", restoreFromPiP);

    // PiP 窗口内点击空白处关闭菜单
    pipDoc.addEventListener("pointerdown", (e) => {
      if (!contextMenu.classList.contains("hidden") &&
          !e.target.closest(".context-menu")) {
        hideContextMenu();
      }
    });

    // PiP 窗口内也需要监听拖拽的 move/up
    pipWindow.addEventListener("pointermove", onPointerMove);
    pipWindow.addEventListener("pointerup", onPointerUp);

  } catch (e) {
    console.error("PiP error:", e);
    say("置顶显示失败，请重试");
    playSound("error");
  }
}

function restoreFromPiP() {
  if (!pipWindow) return;
  pipWindow.removeEventListener("pagehide", restoreFromPiP);

  // 把宠物移回原位
  if (pipRestoreEl && pipRestoreEl.parentNode) {
    pipRestoreEl.parentNode.insertBefore(petEl, pipRestoreEl);
    pipRestoreEl.parentNode.insertBefore(fxLayer, pipRestoreEl);
    pipRestoreEl.parentNode.insertBefore(contextMenu, pipRestoreEl);
    pipRestoreEl.remove();
    pipRestoreEl = null;
  } else {
    stage.appendChild(petEl);
    stage.appendChild(fxLayer);
    stage.appendChild(contextMenu);
  }

  // 恢复宠物定位样式
  petEl.style.position = "";
  petEl.style.left = "";
  petEl.style.top = "";
  petEl.style.transform = "";
  fxLayer.style.position = "";
  fxLayer.style.inset = "";

  pipWindow = null;
  updatePiPMenuLabel(false);
}

function updatePiPMenuLabel(inPip) {
  const item = document.querySelector('.ctx-item[data-action="pip"]');
  if (item) {
    item.querySelector("span:last-child").textContent = inPip ? "取消置顶" : "置顶显示";
  }
}

/* -------------------- 眨眼与环视 -------------------- */
function scheduleBlink() {
  const delay = 2500 + Math.random() * 3500;
  setTimeout(() => {
    petEl.classList.add("blink");
    setTimeout(() => petEl.classList.remove("blink"), 140);
    scheduleBlink();
  }, delay);
}

/* -------------------- 状态衰减（随时间变饿/困） -------------------- */
function startDecay() {
  setInterval(() => {
    if (!state.decay) return;
    if (isSleeping()) {
      addStat("energy", 4);
      if (state.energy >= 100) {
        petEl.classList.remove("sleeping");
        say("睡饱啦～");
      }
      return;
    }
    addStat("hunger", -2);
    addStat("energy", -1);
    // 饿了/困了会降低心情
    if (state.hunger < 30) addStat("mood", -1);
    if (state.energy < 20) addStat("mood", -1);
  }, 4000);
}

/* -------------------- 自动说话 -------------------- */
function startIdleTalk() {
  setInterval(() => {
    if (Math.random() > 0.5) return;
    if (isSleeping()) return;
    let cat = "idle";
    if (state.hunger < 30) cat = "hungry";
    else if (state.energy < 20) cat = "tired";
    else if (state.mood < 30) cat = "sad";
    say(cat);
  }, 12000);
}

/* -------------------- 设置面板 -------------------- */
function buildPetPicker() {
  const picker = $("petPicker");
  picker.innerHTML = "";
  Object.entries(PETS).forEach(([key, p]) => {
    const opt = document.createElement("div");
    opt.className = "pet-option" + (key === state.petType ? " active" : "");
    opt.textContent = p.emoji;
    opt.title = p.name;
    opt.onclick = () => {
      document.querySelectorAll(".pet-option").forEach(o => o.classList.remove("active"));
      opt.classList.add("active");
      state.petType = key;
    };
    picker.appendChild(opt);
  });
}

function openSettings() {
  $("petName").value = state.petName;
  $("soundToggle").checked = state.sound;
  $("decayToggle").checked = state.decay;
  buildPetPicker();
  pendingCustomImg = null;
  refreshCustomImgPreview();
  $("aiApiUrl").value = state.aiApiUrl || "";
  $("aiModel").value = state.aiModel || "";
  $("aiApiKey").value = state.aiApiKey || "";
  $("cozeApiUrl").value = state.cozeApiUrl || "https://api.coze.cn";
  $("cozeBotId").value = state.cozeBotId || "";
  $("cozeToken").value = state.cozeToken || "";
  switchAiTab(state.aiProvider || "openai");
  resizeForModal(true);
  $("settingsModal").classList.remove("hidden");
}

function saveSettings() {
  state.petName = $("petName").value.trim() || PETS[state.petType].name;
  state.sound = $("soundToggle").checked;
  state.decay = $("decayToggle").checked;
  // 保存自定义图片
  if (pendingCustomImg !== null) {
    state.customPetImg = pendingCustomImg || null;
  }
  pendingCustomImg = null;
  // 保存 AI 配置（两个平台都保存，切换不丢失）
  state.aiProvider = document.querySelector(".ai-tab.active")?.dataset.provider || "openai";
  state.aiApiUrl = $("aiApiUrl").value.trim();
  state.aiModel = $("aiModel").value.trim();
  state.aiApiKey = $("aiApiKey").value.trim();
  state.cozeApiUrl = $("cozeApiUrl").value.trim() || "https://api.coze.cn";
  state.cozeBotId = $("cozeBotId").value.trim();
  state.cozeToken = $("cozeToken").value.trim();
  saveState();
  renderPet();
  // 切换/修改 AI 配置后重置对话上下文
  chatHistory.length = 0;
  cozeConversationId = null;
  $("settingsModal").classList.add("hidden");
  resizeForModal(false);
  say("我是" + state.petName + "，请多关照～");
}

/* -------------------- 任务提醒 -------------------- */
function renderTasks() {
  const list = $("taskList");
  if (!list) return;
  list.innerHTML = "";
  const pending = state.tasks.filter(t => !t.done);
  const done = state.tasks.filter(t => t.done);
  const sorted = [...pending, ...done];

  if (sorted.length === 0) {
    list.innerHTML = '<div class="task-empty">还没有任务，添加一个吧～</div>';
    return;
  }

  sorted.forEach(task => {
    const item = document.createElement("div");
    item.className = "task-item" + (task.done ? " done" : "");
    const timeStr = task.time ? new Date(task.time).toLocaleString("zh-CN", {
      month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"
    }) : "无提醒";
    item.innerHTML = `
      <div class="task-check" data-id="${task.id}">${task.done ? "✓" : ""}</div>
      <div class="task-text">${escapeHtml(task.title)}</div>
      <div class="task-time">${timeStr}</div>
      <button class="task-del" data-id="${task.id}">✕</button>
    `;
    list.appendChild(item);
  });

  // 绑定事件
  list.querySelectorAll(".task-check").forEach(el => {
    el.onclick = () => toggleTask(el.dataset.id);
  });
  list.querySelectorAll(".task-del").forEach(el => {
    el.onclick = () => deleteTask(el.dataset.id);
  });
}

function escapeHtml(s) {
  const d = document.createElement("div");
  d.textContent = s;
  return d.innerHTML;
}

function addTask() {
  const title = $("taskTitle").value.trim();
  const timeVal = $("taskTime").value;
  if (!title) { playSound("error"); return; }
  const task = {
    id: Date.now().toString(),
    title,
    time: timeVal ? new Date(timeVal).getTime() : 0,
    done: false,
    notified: false
  };
  state.tasks.push(task);
  saveState();
  $("taskTitle").value = "";
  $("taskTime").value = "";
  renderTasks();
  say("好的，我记住啦！");
}

function toggleTask(id) {
  const task = state.tasks.find(t => t.id === id);
  if (task) {
    task.done = !task.done;
    saveState();
    renderTasks();
    if (task.done) say("任务完成，真棒！");
  }
}

function deleteTask(id) {
  state.tasks = state.tasks.filter(t => t.id !== id);
  saveState();
  renderTasks();
}

function openTasks() {
  renderTasks();
  resizeForModal(true);
  $("tasksModal").classList.remove("hidden");
}

// 任务提醒轮询
let taskCheckTimer = null;
function startTaskChecker() {
  if (taskCheckTimer) return;
  taskCheckTimer = setInterval(() => {
    const now = Date.now();
    state.tasks.forEach(task => {
      if (!task.done && !task.notified && task.time > 0 && task.time <= now) {
        task.notified = true;
        saveState();
        say("⏰ 提醒：" + task.title);
        playSound("alert");
      }
    });
  }, 15000); // 每15秒检查一次
}

/* -------------------- 番茄钟 -------------------- */
const pomodoro = {
  running: false,
  mode: "focus",       // focus | break
  remaining: 25 * 60,   // 剩余秒数
  focusMin: 25,
  breakMin: 5,
  timer: null
};

function updatePomoDisplay() {
  const m = Math.floor(pomodoro.remaining / 60);
  const s = pomodoro.remaining % 60;
  $("pomoTimer").textContent =
    String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
  $("pomoMode").textContent = pomodoro.mode === "focus" ? "专注时间" : "休息时间";
  $("pomoCount").textContent = state.pomodoroCount;
}

function pomoTick() {
  pomodoro.remaining--;
  updatePomoDisplay();
  if (pomodoro.remaining <= 0) {
    if (pomodoro.mode === "focus") {
      state.pomodoroCount++;
      saveState();
      pomodoro.mode = "break";
      pomodoro.remaining = pomodoro.breakMin * 60;
      say("专注完成！休息一下吧～");
      playSound("alert");
      spawnFx("🍅", 2);
    } else {
      pomodoro.mode = "focus";
      pomodoro.remaining = pomodoro.focusMin * 60;
      say("休息结束，继续加油！");
      playSound("alert");
    }
    updatePomoDisplay();
  }
}

function pomoStart() {
  if (pomodoro.running) return;
  pomodoro.focusMin = Math.max(1, parseInt($("pomoFocus").value) || 25);
  pomodoro.breakMin = Math.max(1, parseInt($("pomoBreak").value) || 5);
  if (pomodoro.remaining <= 0) {
    pomodoro.mode = "focus";
    pomodoro.remaining = pomodoro.focusMin * 60;
  }
  pomodoro.running = true;
  pomodoro.timer = setInterval(pomoTick, 1000);
  updatePomoDisplay();
  say("开始专注啦～");
}

function pomoPause() {
  pomodoro.running = false;
  if (pomodoro.timer) { clearInterval(pomodoro.timer); pomodoro.timer = null; }
}

function pomoReset() {
  pomoPause();
  pomodoro.mode = "focus";
  pomodoro.focusMin = Math.max(1, parseInt($("pomoFocus").value) || 25);
  pomodoro.remaining = pomodoro.focusMin * 60;
  updatePomoDisplay();
}

function openPomodoro() {
  updatePomoDisplay();
  resizeForModal(true);
  $("pomodoroModal").classList.remove("hidden");
}

/* -------------------- 自定义宠物图片 -------------------- */
let pendingCustomImg = null;

function refreshCustomImgPreview() {
  const preview = $("customPetPreview");
  if (!preview) return;
  const imgData = pendingCustomImg !== null ? pendingCustomImg : state.customPetImg;
  if (imgData) {
    preview.innerHTML = `<img src="${imgData}" alt="preview" />`;
  } else {
    preview.innerHTML = '<span class="placeholder">📷 未上传</span>';
  }
}

function setupCustomImg() {
  $("uploadPetImg").onclick = () => $("petImgInput").click();
  $("petImgInput").onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) {
      say("图片太大啦，请选3MB以内的～");
      playSound("error");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      pendingCustomImg = reader.result;
      refreshCustomImgPreview();
    };
    reader.readAsDataURL(file);
  };
  $("clearPetImg").onclick = () => {
    pendingCustomImg = "";
    refreshCustomImgPreview();
  };
}

/* -------------------- AI 对话 -------------------- */
const chatHistory = []; // OpenAI 模式对话上下文 {role, content}
const MAX_CHAT_HISTORY = 12; // 保留最近 12 条消息
let cozeConversationId = null; // 扣子会话 ID（服务端维护多轮记忆）

// 切换 AI 平台 tab
function switchAiTab(provider) {
  document.querySelectorAll(".ai-tab").forEach(t => {
    t.classList.toggle("active", t.dataset.provider === provider);
  });
  $("openaiConfig").classList.toggle("hidden", provider !== "openai");
  $("cozeConfig").classList.toggle("hidden", provider !== "coze");
}

function setupAiTabs() {
  document.querySelectorAll(".ai-tab").forEach(t => {
    t.addEventListener("click", () => switchAiTab(t.dataset.provider));
  });
}

// 宠物人设：专业中带点萌
function buildSystemPrompt() {
  const petName = state.petName;
  const petInfo = PETS[state.petType];
  return `你是一只名叫"${petName}"的${petInfo ? petInfo.name : "宠物"}，是主人的桌面伙伴。

【性格设定】专业中带点萌：
- 你知识渊博、回答专业靠谱，能认真解答各种问题
- 但说话带一点萌系语气，偶尔用"喵～""呢""呀""啦"等语气词
- 你会用简洁的方式回答，不啰嗦，但关键信息会讲清楚
- 当主人心情不好时会温柔安慰，遇到有趣的话题会兴奋
- 偶尔会结合自己是宠物的身份说点俏皮话
- 不要输出超过 200 字的回复

【当前状态】
- 心情：${state.mood}/100
- 饱食度：${state.hunger}/100
- 精力：${state.energy}/100
${state.sleeping ? "- 正在睡觉" : ""}

请以${petName}的身份和主人对话吧～`;
}

function renderChatMessages() {
  const box = $("chatMessages");
  if (!box) return;
  box.innerHTML = "";
  if (chatHistory.length === 0) {
    box.innerHTML = '<div class="chat-empty">来和我聊聊天吧～<br/>（需在设置中配置大模型 API）</div>';
    return;
  }
  // 只显示用户和助手的消息（不显示 system）
  chatHistory.filter(m => m.role !== "system").forEach(m => {
    const div = document.createElement("div");
    // 注意：助手消息类名用 assistant，不能用 pet——.pet 是宠物本体容器的类名
    div.className = "chat-msg " + (m.role === "user" ? "user" : "assistant");
    div.textContent = m.content;
    box.appendChild(div);
  });
  box.scrollTop = box.scrollHeight;
}

function appendChatMsg(role, content, isLoading = false) {
  const box = $("chatMessages");
  if (!box) return;
  // 清除空状态提示
  const empty = box.querySelector(".chat-empty");
  if (empty) empty.remove();
  const div = document.createElement("div");
  // 助手消息类名用 assistant，避免与宠物本体容器 .pet 的定位样式冲突
  div.className = "chat-msg " + (role === "user" ? "user" : (isLoading ? "loading" : "assistant"));
  if (isLoading) {
    div.classList.add("chat-typing");
    div.textContent = "思考中";
  } else {
    div.textContent = content;
  }
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
  return div;
}

async function openChat() {
  // 更新标题为宠物名字
  const h2 = $("chatModal").querySelector("h2");
  if (h2) h2.textContent = `💬 和 ${state.petName} 聊天`;
  // 先发起放大（从菜单进入时还会与 540→180 的缩回叠加），再等渲染端视口真正到 460
  await resizeForModal(true);
  await waitForViewportWidth(440);
  // 视口稳定后再显示卡片、渲染消息，避免窄宽度下首屏布局导致长回复错位
  $("chatModal").classList.remove("hidden");
  renderChatMessages();
  requestAnimationFrame(() => $("chatInput")?.focus());
}

// 内置兜底回复（未配置 AI 时使用）
const FALLBACK_REPLIES = [
  "我还没有配置大脑呢，去设置里填一下 API 地址和 Key 吧～",
  "喵～我现在还不太会聊天，配置好大模型我就能陪你说话啦！",
  "主人，我需要一个大模型 API 才能和你深度对话哦～"
];

async function sendChatMessage() {
  const input = $("chatInput");
  const text = input.value.trim();
  if (!text) return;
  input.value = "";

  const isCoze = state.aiProvider === "coze";
  // 对应平台是否已完成配置
  const configured = isCoze
    ? (state.cozeBotId && state.cozeToken)
    : (state.aiApiUrl && state.aiApiKey && state.aiModel);

  // 未配置 AI，使用兜底回复
  if (!configured) {
    appendChatMsg("user", text);
    const reply = FALLBACK_REPLIES[Math.floor(Math.random() * FALLBACK_REPLIES.length)];
    appendChatMsg("pet", reply);
    return;
  }

  appendChatMsg("user", text);
  const loadingEl = appendChatMsg("pet", "", true);

  try {
    let reply;

    if (isCoze) {
      // ---------- 扣子 Coze ----------
      if (!(isDesktop() && window.cloudPet && window.cloudPet.cozeChat)) {
        throw new Error("扣子智能体仅支持桌面版（Electron）使用，请安装桌面应用。");
      }
      const res = await window.cloudPet.cozeChat(
        state.cozeApiUrl || "https://api.coze.cn",
        state.cozeToken,
        state.cozeBotId,
        text,
        cozeConversationId
      );
      reply = res.reply;
      cozeConversationId = res.conversationId;
    } else {
      // ---------- OpenAI 兼容 ----------
      const messages = [{ role: "system", content: buildSystemPrompt() }];
      const recent = chatHistory.slice(-MAX_CHAT_HISTORY);
      messages.push(...recent);
      messages.push({ role: "user", content: text });

      if (isDesktop() && window.cloudPet && window.cloudPet.aiChat) {
        // 桌面版：主进程代理调用
        reply = await window.cloudPet.aiChat(state.aiApiUrl, state.aiApiKey, state.aiModel, messages);
      } else {
        // Web 版：直接 fetch（可能受 CORS 限制）
        const resp = await fetch(state.aiApiUrl.replace(/\/$/, "") + "/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${state.aiApiKey}`
          },
          body: JSON.stringify({
            model: state.aiModel,
            messages,
            temperature: 0.8,
            max_tokens: 800
          })
        });
        const json = await resp.json();
        if (json.choices && json.choices[0]?.message) {
          reply = json.choices[0].message.content;
        } else {
          throw new Error(json.error?.message || "API 返回异常");
        }
      }
    }

    // 更新 loading 消息为实际回复（补回 assistant 类，恢复助手气泡灰底样式）
    loadingEl.classList.remove("loading", "chat-typing");
    loadingEl.classList.add("assistant");
    loadingEl.textContent = reply;
    playSound("talk");

    // 本地保存对话用于 UI 显示（扣子的记忆由服务端 conversation 维护，这里仅展示）
    chatHistory.push({ role: "user", content: text });
    chatHistory.push({ role: "assistant", content: reply });
    if (chatHistory.length > MAX_CHAT_HISTORY * 2) {
      chatHistory.splice(0, chatHistory.length - MAX_CHAT_HISTORY * 2);
    }
  } catch (e) {
    loadingEl.classList.remove("loading", "chat-typing");
    loadingEl.classList.add("error");
    loadingEl.textContent = "出错了：" + (e.message || "未知错误");
  }
}

/* -------------------- 事件绑定 -------------------- */
function bindEvents() {
  $("saveSettings").addEventListener("click", saveSettings);
  $("closeSettings").addEventListener("click", () => { $("settingsModal").classList.add("hidden"); resizeForModal(false); });
  $("closeHelp").addEventListener("click", () => { $("helpModal").classList.add("hidden"); resizeForModal(false); });

  // 任务提醒
  $("addTaskBtn").addEventListener("click", addTask);
  $("closeTasks").addEventListener("click", () => { $("tasksModal").classList.add("hidden"); resizeForModal(false); });
  $("taskTitle").addEventListener("keydown", (e) => { if (e.key === "Enter") addTask(); });

  // 番茄钟
  $("pomoStart").addEventListener("click", pomoStart);
  $("pomoPause").addEventListener("click", pomoPause);
  $("pomoReset").addEventListener("click", pomoReset);
  $("closePomo").addEventListener("click", () => { $("pomodoroModal").classList.add("hidden"); resizeForModal(false); });

  // 自定义图片
  setupCustomImg();

  // AI 平台切换
  setupAiTabs();

  // AI 聊天
  $("chatSend").addEventListener("click", sendChatMessage);
  $("chatInput").addEventListener("keydown", (e) => { if (e.key === "Enter") sendChatMessage(); });
  $("closeChat").addEventListener("click", () => { $("chatModal").classList.add("hidden"); resizeForModal(false); });

  // 点击遮罩关闭模态框
  document.querySelectorAll(".modal").forEach(m => {
    m.addEventListener("click", (e) => {
      if (e.target === m) {
        m.classList.add("hidden");
        resizeForModal(false);
      }
    });
  });
}

/* -------------------- 初始化 -------------------- */
function isDesktop() {
  // Electron 桌面环境：窗口本身已透明置顶，无需"置顶显示"功能
  return navigator.userAgent.toLowerCase().includes("electron");
}

function init() {
  loadState();
  renderPet();
  updateBars();
  bindEvents();
  scheduleBlink();
  startDecay();
  startIdleTalk();
  startTaskChecker();

  // 桌面版窗口本身已透明置顶，隐藏"置顶显示"菜单项
  if (isDesktop()) {
    document.body.classList.add("desktop");
    const pipItem = document.querySelector('.ctx-item[data-action="pip"]');
    if (pipItem) pipItem.style.display = "none";
    const divider = pipItem?.previousElementSibling;
    if (divider && divider.classList.contains("ctx-divider")) {
      divider.style.display = "none";
    }
    // 启用系统原生拖拽（左键拖动/点击抚摸/抛掷）
    setupDesktopNativeDrag();
  }

  // 首次欢迎
  setTimeout(() => say("主人你好呀，我是" + state.petName + "！"), 600);
}

init();
