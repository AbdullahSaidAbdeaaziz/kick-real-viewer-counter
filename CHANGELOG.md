# 📝 Changelog

All notable changes to the Kick Real Chat Viewers extension will be documented in this file.

## [1.2.0] - 2025-08-08

### 🔄 Added - Stream Persistence Feature
- **Stream Memory**: Extension now remembers viewer counts when switching between streams
- **Automatic Saving**: Current data automatically saved when leaving a stream
- **Smart Restoration**: Previous counts restored when returning to previously visited streams
- **Visual Indicators**: Yellow overlay highlight and 🔄 icon when data is restored
- **Manual Controls**: New popup buttons for Save Data and Clear All Data
- **Storage Management**: Automatic cleanup of data older than 7 days

### 🎨 Enhanced
- **Popup Interface**: Added stream name display and enhanced controls
- **Cross-Browser API**: Improved compatibility with browser-specific APIs
- **Error Handling**: Better error messages and graceful degradation
- **File Organization**: Restructured project files into organized directories

### 🛠️ Technical
- **Storage Permissions**: Added browser storage permissions to manifests
- **Async/Await**: Modernized code with proper async handling
- **Data Format**: Structured storage format with metadata
- **Performance**: Optimized data merging and restoration logic

### 📁 Project Structure
- Organized files into `src/`, `assets/`, `docs/`, `manifests/`, `tests/` directories
- Updated manifest files to reflect new file paths
- Comprehensive documentation and build scripts

## [1.1.0] - 2025-08-07

### ✨ Added - Cross-Browser Compatibility
- **Universal Support**: Chrome, Firefox, Edge, Brave, Opera compatibility
- **Browser Detection**: Automatic browser API detection and polyfills
- **Manifest Variants**: Separate manifests for V2 (Firefox) and V3 (Chromium)
- **Error Handling**: Improved error handling for different browser APIs

### 🎯 Enhanced
- **Selector Robustness**: Multiple fallback CSS selectors for better reliability
- **Username Detection**: Enhanced chat message parsing with multiple patterns
- **Debug Logging**: Optional debug mode for troubleshooting
- **Documentation**: Comprehensive browser-specific installation guides

## [1.0.0] - 2025-08-06

### 🎉 Initial Release
- **Real-time Chat Monitoring**: Track unique users who send messages
- **Official Viewer Comparison**: Compare real chatters vs official viewer count
- **Draggable Overlay**: Movable floating display with engagement percentage
- **Stream Detection**: Automatic detection of live stream pages
- **Reset Functionality**: Manual counter reset capability

### 🔧 Core Features
- **DOM Observation**: Monitor chat messages using MutationObserver
- **Unique User Tracking**: Set-based duplicate prevention
- **Visual Display**: Clean overlay with emoji indicators
- **Browser Extension**: Complete Chrome extension implementation

---

## 🔮 Upcoming Features

### Planned for v1.3.0
- **Export Functionality**: Export data as CSV/JSON
- **Enhanced Analytics**: Historical data and trends
- **Custom Themes**: User customizable overlay appearance
- **Notification System**: Alerts for engagement milestones

### Under Consideration
- **Multi-Platform Support**: Twitch, YouTube integration
- **Community Features**: Shareable statistics
- **Advanced Filtering**: Chat message type filtering
- **API Integration**: Third-party tool connectivity

---

*Format based on [Keep a Changelog](https://keepachangelog.com/)*
