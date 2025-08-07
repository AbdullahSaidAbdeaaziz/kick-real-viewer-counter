# 🔍 Kick Real Chat Viewers - Universal Browser Extension

Track the **real number of unique chatters** in a Kick live stream in real time, and compare it to the official viewer count. Perfect for spotting active chats, lurking ratios, or engagement drops!

## 🌐 **Cross-Browser Support**
- ✅ **Chrome** 
- ✅ **Microsoft Edge**
- ✅ **Brave Browser**
- ✅ **Opera**
- ✅ **Firefox**

![Screenshot](icon.png)

---

## 📦 Features

- ✅ Count unique chat users who send a message
- ✅ Live chat view ratio compared to official viewers
- ✅ Automatically resets when switching streams
- ✅ Smart overlay with percentage active
- ✅ Movable floating panel — drag it anywhere on the screen!

---

## 🛠️ Installation

### **Quick Setup** 
See detailed instructions in [BROWSER-SUPPORT.md](BROWSER-SUPPORT.md)

**Chrome/Edge/Brave/Opera:**
1. Extract extension → Go to `chrome://extensions/` → Enable Developer Mode → Load unpacked

**Firefox:**  
1. Extract extension → Rename `manifest-firefox.json` to `manifest.json` → Go to `about:debugging` → Load Temporary Add-on

---

## 💬 How It Works

- The script observes chat messages inside the DOM.
- Every time a unique user sends a message, they are counted.
- The current **official viewer number** is also scraped and decoded from animated digits.
- A floating overlay displays:
![overlay](./overlay.png)


## 🧠 Credits

Made with ❤️ by [AbdullahSaidAbdeaaziz](https://www.github.com/AbdullahSaidAbdeaaziz).

## 📜 License

MIT License. Free to use, modify, and improve.