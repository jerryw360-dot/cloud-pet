# 云桌宠 · Cloud Pet

一个可爱的桌面宠物，支持 **Web 版**（浏览器/云端部署）和 **桌面版**（Tauri 打包，透明无边框置顶窗口）。打开页面只看到宠物本身，**右键点击宠物**即可呼出所有操作菜单。

## ✨ 功能

- 🐱 5 种可爱宠物：小猫、小狗、小兔、仓鼠、熊猫（纯 SVG 绘制）
- 🖱️ 拖拽宠物在屏幕上自由移动（全屏可拖）
- 👆 左键点击宠物 = 抚摸，会开心并飘出爱心
- 🖱️ **右键点击宠物** = 弹出菜单（含状态条 + 所有操作）
- 🍖 喂食、🎾 玩耍、💤 睡觉/叫醒、💬 对话
- 📊 心情 / 饱食度 / 精力 三维状态，会随时间衰减
- 💬 智能对话气泡（会根据状态说话）
- 📌 **置顶显示**：
  - Web 版：Document Picture-in-Picture API（需 Chrome 116+）
  - 桌面版：原生透明置顶窗口，始终浮在所有窗口之上
- 🔊 Web Audio 合成音效
- ⚙️ 设置面板：改名、换宠物、开关音效与衰减
- 💾 设置自动保存到本地
- 🪟 背景完全透明，只看到宠物

## 🚀 本地预览

项目是纯静态文件，任一静态服务器即可：

```bash
# Python 3
python -m http.server 8000

# Node
npx serve .

# PHP
php -S localhost:8000
```

然后访问 http://localhost:8000

## ☁️ 云端部署（任选其一）

本项目**无需构建**，将整个目录上传即可。

### 方案一：Vercel（推荐，最简单）

```bash
npm i -g vercel
vercel
```

或在网页版 vercel.com 直接把目录拖拽上传，Build Command 留空，Output Directory 填 `.`。

### 方案二：Netlify

1. 访问 https://app.netlify.com/drop
2. 把整个项目文件夹拖进去
3. 几秒钟后获得公网链接

### 方案三：GitHub Pages

```bash
git init
git add .
git commit -m "init cloud pet"
git branch -M main
git remote add origin https://github.com/你的用户名/仓库名.git
git push -u origin main
```

然后在仓库 Settings → Pages 选择 main 分支即可。

### 方案四：Cloudflare Pages

1. 登录 Cloudflare → Pages → Create a project
2. 上传目录或连接 GitHub 仓库
3. Framework preset 选 None，Build command 留空，Output directory 填 `.`

## 📁 项目结构

```
.
├── index.html          # 页面结构（宠物 UI）
├── style.css           # 样式与动画
├── app.js              # 宠物逻辑与交互
├── main.js             # Electron 主进程（透明置顶窗口）
├── preload.js          # Electron 安全桥接层
├── package.json        # Electron 依赖与打包配置
├── download.html       # 桌面版下载页
└── README.md
```

## 🖥️ 桌面版（Electron）

桌面版会生成一个**透明、无边框、始终置顶**的原生窗口，宠物直接浮在桌面上，无标题栏。

### 环境要求

- [Node.js](https://nodejs.org/) 18+（仅需 Node.js，无需 Rust/编译器）

### 开发运行

```bash
npm install
npm run dev
```

### 打包 Windows 安装包

```bash
npm run build
```

打包完成后，安装包在 `dist/云桌宠 Setup 1.0.0.exe`（约 75 MB）。

> 首次打包需要从国内镜像下载 Electron 二进制和 electron-builder 工具。如遇网络问题，设置：
> ```bash
> $env:ELECTRON_MIRROR = "https://npmmirror.com/mirrors/electron/"
> $env:ELECTRON_BUILDER_BINARIES_MIRROR = "https://npmmirror.com/mirrors/electron-builder-binaries/"
> $env:CSC_IDENTITY_AUTO_DISCOVERY = "false"
> ```

### 窗口配置说明

桌面版窗口（`main.js`）已配置为：
- `transparent: true` — 背景透明
- `frame: false` — 无边框、无标题栏
- `alwaysOnTop: true` — 始终置顶
- `skipTaskbar: false` — 在任务栏显示（方便用户找到）
- `hasShadow: false` — 无阴影

如需调整窗口大小，修改 `main.js` 中的 `width` / `height`。

## 🌐 网页下载安装包

将 `dist/云桌宠 Setup 1.0.0.exe` 放到 Web 服务器上，用户访问 `download.html` 即可下载安装。

部署到云端（如 Vercel / Netlify / GitHub Pages）时，把 `dist/` 目录和 `download.html` 一起上传，下载链接自动指向安装包。

## 🛠️ 自定义

- 想加新宠物：在 `app.js` 的 `PETS` 对象里添加一项（emoji + SVG）即可。
- 想改对话：修改 `PHRASES` 里的文字数组。
- 想调节奏：修改 `startDecay` 里的数值。
