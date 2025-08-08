# 📋 Project Overview

## 🎯 Project Summary

**Kick Real Chat Viewers** is a sophisticated browser extension that provides authentic engagement metrics for Kick.com livestreams by tracking unique active chatters in real-time.

## 🏗️ Architecture

### **Frontend (Extension)**
- **Content Script** (`src/content.js`) - Main logic, DOM monitoring, data persistence
- **Popup Interface** (`src/popup.js` + `src/popup.html`) - User controls and statistics display
- **Background Processing** - Storage management and cross-tab communication

### **Storage System**
- **Local Storage** - Browser-native storage API for data persistence
- **Per-Stream Keys** - Unique storage identifiers for each livestream
- **Auto-Cleanup** - Automated removal of stale data (7+ days old)

### **Cross-Browser Compatibility**
- **Manifest V3** - Chrome, Edge, Brave, Opera (`manifest.json`)
- **Manifest V2** - Firefox (`manifests/manifest-firefox.json`)
- **API Polyfills** - Universal browser API detection and usage

## 🔄 Data Flow

```
1. User visits Kick.com stream
2. Content script initializes and checks for saved data
3. If previous data exists → restore users and display count
4. Monitor chat messages in real-time
5. Extract usernames and add to unique user set
6. Update overlay display every 5 seconds
7. When user switches streams → save current data
8. Repeat process for new stream
```

## 🎨 User Interface

### **Floating Overlay**
- Draggable position anywhere on screen
- Real-time count display with engagement ratio
- Visual indicators for restored data (yellow highlight + 🔄)
- Responsive design that doesn't interfere with stream

### **Extension Popup**
- Current stream statistics and controls
- Manual save/reset/clear functions
- Stream name display
- Real-time data refresh capability

## 🔧 Technical Features

### **Smart Chat Detection**
- Multiple regex patterns for username extraction
- Support for various chat message formats
- Fallback selectors for robust DOM element finding
- Handles dynamic content loading

### **Performance Optimization**
- Efficient Set data structure for unique user tracking
- Debounced DOM updates to prevent excessive redraws
- Selective element querying with fallback options
- Memory-conscious storage management

### **Error Handling**
- Graceful degradation when APIs unavailable
- Comprehensive try-catch blocks around critical operations
- User-friendly error messages in popup interface
- Debug mode for development troubleshooting

## 🛡️ Privacy & Security

### **Data Handling**
- **Local Only** - All data stored locally on user's device
- **No External Servers** - No data transmitted to third parties
- **User Control** - Complete manual control over data retention
- **Automatic Cleanup** - Prevents indefinite data accumulation

### **Permissions**
- **Minimal Scope** - Only requests necessary permissions
- **Site-Specific** - Limited to kick.com domain
- **Storage Access** - Local storage only for persistence
- **Tab Access** - For popup communication only

## 📈 Roadmap

### **Potential Enhancements**
- Export data functionality (CSV/JSON)
- Advanced analytics and trending
- Custom notification settings
- Multi-platform support (Twitch, YouTube)
- Enhanced UI themes and customization

### **Community Features**
- Shareable engagement statistics
- Leaderboards for most active streams
- Integration with streaming tools
- API for third-party applications

## 🧪 Testing Strategy

### **Browser Compatibility Testing**
- Automated testing across Chrome, Firefox, Edge, Brave, Opera
- Manifest validation for different browser versions
- API compatibility verification

### **Functionality Testing**
- Real-time chat detection accuracy
- Data persistence across sessions
- UI responsiveness and usability
- Performance under high chat volume

### **Error Scenarios**
- Network connectivity issues
- DOM structure changes on Kick.com
- Storage quota limitations
- Extension update compatibility

## 📊 Metrics & Analytics

### **Usage Metrics** (Local Only)
- Streams visited and duration
- Data restoration frequency
- Manual action usage patterns
- Error occurrence tracking

### **Performance Metrics**
- Memory usage optimization
- CPU impact measurement
- Storage efficiency analysis
- Response time monitoring

---

*This overview is maintained to help contributors understand the project architecture and facilitate future development.*
