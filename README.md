# 🔍 Kick Real Chat Viewers

> **Track authentic engagement on Kick.com livestreams with real-time unique chatter counting and persistent data across streams.**

[![Version](https://img.shields.io/badge/version-1.2-green.svg)](https://github.com/AbdullahSaidAbdeaaziz/kick-real-viewer-counter)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Browser Support](https://img.shields.io/badge/browsers-Chrome%20%7C%20Firefox%20%7C%20Edge%20%7C%20Brave%20%7C%20Opera-brightgreen.svg)]()

## � Table of Contents

- [📖 Overview](#-overview)
- [✨ Features](#-features)
- [🚀 Quick Start](#-quick-start)
  - [Option 1: Use Build Scripts (Recommended)](#option-1-use-build-scripts-recommended)
  - [Option 2: Manual Installation (Advanced Users)](#option-2-manual-installation-advanced-users)
  - [Usage](#usage)
  - [Why Use the Build Scripts?](#why-use-the-build-scripts-)
- [🎮 How It Works](#-how-it-works)
- [📁 Project Structure](#-project-structure)
- [🔧 Advanced Usage](#-advanced-usage)
- [📊 Technical Details](#-technical-details)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👨‍💻 Author](#-author)
- [🔗 Links](#-links)

---

## �📖 Overview

**Kick Real Chat Viewers** is a cross-browser extension that provides **accurate engagement metrics** by counting unique users who actively chat during Kick.com livestreams. Unlike the official viewer count, this tool shows you how many people are actually participating in the conversation.

### 🎯 **Why Use This Extension?**

- **Discover Real Engagement** - See who's actually chatting vs. just lurking
- **Compare Activity Ratios** - Official viewers vs. active chatters percentage  
- **Never Lose Progress** - Counts persist when switching between streams
- **Multi-Browser Support** - Works on all major browsers
- **Privacy-Focused** - All data stored locally on your device

---

## ✨ Features

### 🔥 **Core Features**
- **Real-time unique chatter counting** with live updates
- **Official viewer comparison** with engagement percentage
- **Draggable floating overlay** - position it anywhere on screen
- **Smart chat detection** with multiple username patterns

### 🔄 **Persistence Features** 
- **Stream memory** - remembers counts when you return to streams
- **Automatic data saving** when switching between streams  
- **Visual restoration indicators** when data is loaded
- **Manual save/reset controls** for full user control

### 🌐 **Cross-Browser Compatibility**
| Browser | Support | Manifest | Status |
|---------|---------|----------|--------|
| Chrome | ✅ | V3 | Full Support |
| Firefox | ✅ | V2 | Full Support |
| Edge | ✅ | V3 | Full Support |
| Brave | ✅ | V3 | Full Support |
| Opera | ✅ | V3 | Full Support |

---

## � Quick Start

### **Option 1: Use Build Scripts (Recommended)**

#### **Build Browser-Specific Packages**
Run the build script to create optimized packages for each browser:

**Windows:**
```batch
build.bat
```

**Linux/macOS:**
```bash
chmod +x build.sh
./build.sh
```

This creates browser-specific packages in the `builds/` directory:
- `builds/chrome-edge-brave-opera/` - Optimized for Chromium browsers  
- `builds/firefox/` - Optimized for Firefox
- `builds/development/` - Full source with documentation

#### **Install from Pre-built Package**

**Chrome / Edge / Brave / Opera:**
1. Run the build script above
2. Open your browser's extension page:
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
   - Brave: `brave://extensions/`
   - Opera: `opera://extensions/`
3. Enable **Developer Mode** (toggle switch)
4. Click **"Load unpacked"** and select `builds/chrome-edge-brave-opera/`
5. ✅ Done! Visit any Kick.com livestream to see it in action

**Firefox:**
1. Run the build script above
2. Open Firefox and navigate to `about:debugging`
3. Click **"This Firefox"** → **"Load Temporary Add-on"**
4. Select any file from `builds/firefox/` directory
5. ✅ Done! (Note: Temporary install - removed on restart)

### **Option 2: Manual Installation (Advanced Users)**

#### **Chrome / Edge / Brave / Opera**
1. Download and extract the extension files
2. Open your browser's extension page (see URLs above)
3. Enable **Developer Mode** (toggle switch)
4. Click **"Load unpacked"** and select the root extension folder
5. ✅ Done!

#### **Firefox**
1. Download and extract the extension files
2. **Important:** Copy `manifests/manifest-firefox.json` to root as `manifest.json`
3. Open Firefox and navigate to `about:debugging`
4. Click **"This Firefox"** → **"Load Temporary Add-on"**
5. Select any file from the extension folder
6. ✅ Done! (Note: Temporary install - removed on restart)

### **Usage**
1. Visit any **Kick.com livestream** 
2. The floating overlay appears showing real-time chatter count
3. Open the extension popup for detailed stats and controls
4. Counts automatically save when switching streams!

### **Why Use the Build Scripts? 🏗️**

The build scripts provide several advantages:

- **🎯 Optimized Packages** - Browser-specific builds with correct manifests
- **📁 Clean Structure** - Only necessary files included in each package  
- **🔄 Automated Process** - No manual file copying or renaming required
- **✅ Error Prevention** - Eliminates common installation mistakes
- **📦 Ready to Share** - Creates distribution-ready packages
- **🧹 No Clutter** - Excludes development files and documentation from builds

The build process automatically:
- Copies the correct manifest for each browser
- Includes only essential extension files
- Organizes files in the proper structure
- Creates separate packages for easy distribution

---

## 🎮 How It Works

### **Real-Time Detection**
- Monitors chat messages in the DOM using MutationObserver
- Extracts usernames with multiple detection patterns
- Maintains a Set of unique users to prevent duplicates
- Updates overlay display every 5 seconds

### **Stream Persistence**
- **Automatic Save:** Data saved when leaving a stream
- **Smart Restore:** Previous counts loaded when returning 
- **Data Merging:** Combines old users with new chatters
- **Storage Cleanup:** Auto-removes data older than 7 days

### **Visual Indicators**
- **💬 123** - Current unique chatter count
- **👁 456 (27% Active)** - Official viewers with activity ratio
- **🔄** - Data restored from previous session (yellow highlight)

---

## 📁 Project Structure

```
kick-real-viewer-counter-enhanced/
├── 📁 src/                  # Source code
│   ├── content.js           # Main extension logic
│   ├── popup.js            # Popup interface logic  
│   └── popup.html          # Popup interface UI
├── 📁 assets/              # Images and icons
│   ├── icon.png            # Extension icon
│   └── overlay.png         # Demo screenshot
├── 📁 manifests/           # Browser manifest files
│   └── manifest-firefox.json  # Firefox-specific manifest
├── 📁 docs/                # Documentation
│   ├── BROWSER-SUPPORT.md  # Installation guides
│   └── STREAM-PERSISTENCE.md  # Persistence feature docs
├── 📁 tests/               # Test files
│   └── test-browser-compat.js  # Browser compatibility tests
├── manifest.json           # Main manifest (Chrome/Edge/Brave/Opera)
├── LICENSE                 # MIT License
└── README.md              # This file
```

---

## 🔧 Advanced Usage

### **Popup Controls**
- **📊 Refresh Data** - Update current stats
- **🔄 Reset Counter** - Clear current count (keeps saved data)
- **💾 Save Data** - Manually save current state  
- **🗑️ Clear All Data** - Remove all stored stream data

### **Debug Mode**
Enable detailed logging by setting `debugMode = true` in `src/content.js`:
```javascript
let debugMode = true; // Set to true for debugging
```

### **Storage Management**
- Data stored locally using browser.storage API
- Each stream has unique storage key
- Automatic cleanup after 7 days
- Manual clear option in popup

---

## 📊 Technical Details

### **Browser APIs Used**
- `browser.storage` / `chrome.storage` - Data persistence
- `browser.tabs` / `chrome.tabs` - Tab communication
- `MutationObserver` - DOM change detection
- `browser.runtime` / `chrome.runtime` - Message passing

### **Storage Format**
```json
{
  "kick_stream_users_streamname": {
    "users": ["user1", "user2", "user3"],
    "count": 3, 
    "lastVisit": 1625097600000,
    "streamPath": "/streamname"
  }
}
```

### **Performance**
- Lightweight DOM scanning with efficient selectors
- Debounced updates to prevent excessive redraws
- Memory-efficient Set usage for duplicate prevention
- Automatic cleanup prevents storage bloat

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

### **Development Setup**
1. Clone the repository
2. Make your changes in the `src/` directory
3. Test across different browsers
4. Update documentation if needed
5. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Abdullah Said Abdeaaziz**  
- GitHub: [@AbdullahSaidAbdeaaziz](https://github.com/AbdullahSaidAbdeaaziz)
- Project: [kick-real-viewer-counter](https://github.com/AbdullahSaidAbdeaaziz/kick-real-viewer-counter)

---

## � Links

- **📚 [Installation Guide](docs/BROWSER-SUPPORT.md)** - Detailed browser-specific instructions
- **🔄 [Persistence Feature](docs/STREAM-PERSISTENCE.md)** - How stream memory works  
- **🐛 [Report Issues](https://github.com/AbdullahSaidAbdeaaziz/kick-real-viewer-counter/issues)** - Bug reports and feature requests

---

<div align="center">

**⭐ Star this project if you find it useful!**

Made with ❤️ for the Kick.com community

</div>
