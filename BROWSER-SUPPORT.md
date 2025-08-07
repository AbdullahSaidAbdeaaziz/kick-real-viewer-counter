# 🌐 Cross-Browser Installation Guide

## 📦 Supported Browsers
- ✅ **Chrome** 
- ✅ **Microsoft Edge**
- ✅ **Brave Browser**
- ✅ **Opera**
- ✅ **Firefox**

---

## 🛠️ Installation

### **Chrome / Edge / Brave / Opera**
1. Download and extract the extension
2. Open browser and go to extensions page:
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
   - Brave: `brave://extensions/`
   - Opera: `opera://extensions/`
3. Enable **Developer Mode** (toggle switch)
4. Click **"Load unpacked"**
5. Select the extension folder
6. Done! ✅

### **Firefox**
1. Download and extract the extension
2. **IMPORTANT**: Rename `manifest-firefox.json` to `manifest.json` (replace existing)
3. Open Firefox and go to `about:debugging`
4. Click **"This Firefox"**
5. Click **"Load Temporary Add-on"**
6. Select any file from the extension folder
7. Done! ✅ (Note: Will be removed when Firefox restarts)

---

## 🔧 Troubleshooting

**Extension not working?**
- Make sure you're on a Kick.com livestream page
- Refresh the page after installing
- Check browser console (F12) for errors

**Firefox: "Manifest is not valid"?**
- Make sure you renamed `manifest-firefox.json` to `manifest.json`

**No viewer count showing?**
- Enable debug mode in `content.js` (set `debugMode = true`)
- Check console for error messages
