# 🔄 Stream Persistence Feature

## 📋 Overview

The extension now **remembers viewer counts** when you switch between streams! No more starting from zero every time you revisit a stream.

## ✨ New Features

### 🔄 **Automatic Stream Data Persistence**
- **Saves unique chatters** when switching streams
- **Restores previous count** when returning to a stream
- **Combines old + new users** for accurate totals
- **Visual indicators** show when data is restored

### 💾 **Manual Data Management**
- **Save Data** - Manually save current count
- **Clear All Data** - Remove all stored stream data
- **Stream Display** - Shows current stream name in popup

### 🎨 **Visual Indicators**
- **Yellow overlay** (3 seconds) when data is restored
- **🔄 Icon** in overlay when showing restored data
- **Green highlight** in popup for restored counts

---

## 🔧 How It Works

### **When You Switch Streams:**
1. **Current stream data is saved** (users + count + timestamp)
2. **New stream is checked** for previous data
3. **If found:** Previous users are restored + new users are added
4. **If not found:** Fresh count starts from 0

### **Data Storage:**
- Uses browser's **local storage API**
- Data persists across browser restarts
- **Auto-cleanup** removes data older than 1 week
- Each stream has its own storage key

### **Smart Merging:**
- **Existing users** from previous visits are preserved
- **New chatters** are added to the existing set
- **No duplicates** - each user counted only once per stream
- **Real-time updates** as new people chat

---

## 🎮 Usage Guide

### **Automatic Mode (Default)**
- Just browse streams normally
- Extension automatically saves/restores data
- No manual intervention needed

### **Manual Controls**
1. **💾 Save Data** - Force save current count
2. **🔄 Reset Counter** - Clear current count (keeps saved data)
3. **🗑️ Clear All Data** - Permanently delete all saved stream data
4. **📊 Refresh Data** - Update popup display

### **Visual Cues**
- **Yellow overlay + 🔄** = Data was restored from previous visit
- **Green text in popup** = Current count includes restored data
- **Stream name shown** = Which stream you're currently viewing

---

## 🛠️ Technical Details

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

### **Cleanup Policy**
- Data older than **7 days** is automatically removed
- Cleanup runs when extension loads
- Prevents storage bloat from old streams

### **Cross-Browser Support**
- Works on Chrome, Firefox, Edge, Brave, Opera
- Uses browser.storage API (Firefox) or chrome.storage API (others)
- Graceful fallback if storage isn't available

---

## 🔍 Debugging

### **Enable Debug Mode**
Set `debugMode = true` in `content.js` to see:
- When data is saved/restored
- Storage operations
- Stream switching events
- User detection events

### **Console Messages**
- `Saved X users for stream: /streamname`
- `Restored X users from previous visit to /streamname`
- `Starting fresh count for new stream: /streamname`

---

## 🆕 Version History

**v1.2** - Stream Persistence
- ✅ Added automatic stream data saving/loading
- ✅ Added manual save/clear controls
- ✅ Added visual restoration indicators
- ✅ Added automatic cleanup of old data
- ✅ Updated storage permissions in manifest
