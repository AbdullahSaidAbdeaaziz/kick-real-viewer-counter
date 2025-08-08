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
- ✅ **🔄 Remembers viewer counts across stream switches**
- ✅ **💾 Persistent data storage - never lose your counts**
- ✅ Smart overlay with percentage active
- ✅ Movable floating panel — drag it anywhere on the screen!
- ✅ Manual save/reset controls in popup
- ✅ Auto-cleanup of old stream data

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
- **🔄 When you switch streams, your current count is saved and previous counts are restored**
- The current **official viewer number** is also scraped and decoded from animated digits.
- A floating overlay displays the count with visual indicators for restored data.

## 🔄 **NEW: Stream Persistence**

The extension now **remembers your viewer counts**! See [STREAM-PERSISTENCE.md](STREAM-PERSISTENCE.md) for full details.

- **Never lose progress** when switching between streams
- **Automatic saving** when you leave a stream  
- **Smart restoration** when you return to a stream
- **Visual indicators** show when data is restored
- **Manual controls** for save/reset/clear in the popup

![overlay](./overlay.png)


## 🧠 Credits

Made with ❤️ by [AbdullahSaidAbdeaaziz](https://www.github.com/AbdullahSaidAbdeaaziz).

## 📜 License

MIT License. Free to use, modify, and improve.
