// content.js - Cross-browser compatible
// Browser API polyfill for cross-browser compatibility
const browserAPI = (() => {
  if (typeof browser !== 'undefined' && browser.runtime) {
    return browser; // Firefox
  } else if (typeof chrome !== 'undefined' && chrome.runtime) {
    return chrome; // Chrome, Edge, Brave, Opera
  } else {
    console.error('No browser extension API found');
    return null;
  }
})();

let uniqueUsers = new Set();
let currentStream = window.location.pathname;
let overlay;
let chatObserver;
let debugMode = false; // Set to true for debugging

// Storage key prefix for stream data
const STORAGE_PREFIX = 'kick_stream_users_';
const STORAGE_SETTINGS = 'kick_settings';

function log(message, ...args) {
  if (debugMode) {
    console.log('[Kick Real Viewer Counter]', message, ...args);
  }
}

// Storage functions for persistent stream data
async function saveStreamData(streamPath, usersSet) {
  if (!browserAPI || !browserAPI.storage) return;
  
  try {
    const storageKey = STORAGE_PREFIX + streamPath.replace(/[^a-zA-Z0-9]/g, '_');
    const usersArray = Array.from(usersSet);
    const data = {
      users: usersArray,
      count: usersArray.length,
      lastVisit: Date.now(),
      streamPath: streamPath
    };
    
    await browserAPI.storage.local.set({ [storageKey]: data });
    log(`Saved ${usersArray.length} users for stream: ${streamPath}`);
  } catch (error) {
    log('Error saving stream data:', error);
  }
}

async function loadStreamData(streamPath) {
  if (!browserAPI || !browserAPI.storage) return null;
  
  try {
    const storageKey = STORAGE_PREFIX + streamPath.replace(/[^a-zA-Z0-9]/g, '_');
    const result = await browserAPI.storage.local.get([storageKey]);
    
    if (result[storageKey]) {
      const data = result[storageKey];
      log(`Loaded ${data.count} users for stream: ${streamPath}`);
      return data;
    }
  } catch (error) {
    log('Error loading stream data:', error);
  }
  
  return null;
}

async function clearOldStreamData() {
  if (!browserAPI || !browserAPI.storage) return;
  
  try {
    const result = await browserAPI.storage.local.get(null);
    const keys = Object.keys(result);
    const streamKeys = keys.filter(key => key.startsWith(STORAGE_PREFIX));
    const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000); // 1 week
    
    const keysToRemove = [];
    for (const key of streamKeys) {
      const data = result[key];
      if (data && data.lastVisit < oneWeekAgo) {
        keysToRemove.push(key);
      }
    }
    
    if (keysToRemove.length > 0) {
      await browserAPI.storage.local.remove(keysToRemove);
      log(`Cleaned up ${keysToRemove.length} old stream data entries`);
    }
  } catch (error) {
    log('Error cleaning old stream data:', error);
  }
}

function createOverlay() {
  if (overlay) {
    log('Overlay already exists, removing old one');
    overlay.remove();
  }
  
  overlay = document.createElement("div");
  overlay.id = "real-chat-viewers";
  Object.assign(overlay.style, {
    position: "fixed",
    top: "10px",
    right: "10px",
    background: "rgba(0, 0, 0, 0.85)",
    color: "#00ff00",
    padding: "4px 8px",
    borderRadius: "6px",
    zIndex: 9999,
    fontSize: "12px",
    fontFamily: "monospace",
    whiteSpace: "nowrap",
    cursor: "move",
    userSelect: "none"
  });
  overlay.textContent = "💬 Real Chat Viewers: 0";
  document.body.appendChild(overlay);

  let offsetX = 0, offsetY = 0, isDragging = false;
  overlay.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - overlay.getBoundingClientRect().left;
    offsetY = e.clientY - overlay.getBoundingClientRect().top;
    overlay.style.transition = "none";
  });
  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      overlay.style.left = `${e.clientX - offsetX}px`;
      overlay.style.top = `${e.clientY - offsetY}px`;
      overlay.style.right = "auto";
    }
  });
  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
}

function getOfficialViewerCount() {
  const digitHeight = 25;
  // Try multiple selectors for better compatibility
  const possibleSelectors = [
    '#channel-content > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > span > span:nth-child(1) > div.flex',
    '[data-testid="viewers-count"] div.flex',
    '.viewer-count div.flex',
    'div.flex[style*="transform"]'
  ];
  
  let digitWrapper = null;
  for (const selector of possibleSelectors) {
    digitWrapper = document.querySelector(selector);
    if (digitWrapper) break;
  }
  
  if (!digitWrapper) {
    log('Could not find viewer count element');
    return null;
  }

  log('Found viewer count element:', digitWrapper);

  const digitColumns = digitWrapper.children;
  let numberStr = "";

  for (let col of digitColumns) {
    const firstDigitDiv = col.querySelector("div");
    if (!firstDigitDiv) continue;
    const transform = firstDigitDiv.style.transform;
    const match = transform.match(/translateY\((-?\d+(?:\.\d+)?)px\)/);
    if (!match) continue;
    const offset = parseFloat(match[1]);
    const digit = Math.abs(Math.round(offset / digitHeight)) % 10;
    numberStr += digit;
  }
  const num = parseInt(numberStr);
  return isNaN(num) ? null : num;
}

function updateOverlay(count, isRestored = false) {
  if (!overlay) createOverlay();
  const official = getOfficialViewerCount();
  let ratio = '';
  if (official && official > 0) {
    const percentage = ((count / official) * 100).toFixed(1);
    ratio = ` / 👁 ${official} (${percentage}% Active)`;
  }
  
  // Add indicator if data was restored
  const restoredIndicator = isRestored ? ' 🔄' : '';
  overlay.textContent = `💬 ${count}${ratio}${restoredIndicator}`;
  
  // Change color temporarily if restored
  if (isRestored) {
    overlay.style.color = "#ffff00"; // Yellow for restored data
    setTimeout(() => {
      overlay.style.color = "#00ff00"; // Back to green
    }, 3000);
  }
}

async function resetCounter() {
  // Save current data before resetting (if we have users and a valid stream)
  if (uniqueUsers.size > 0 && currentStream && isLiveStreamPath(currentStream)) {
    await saveStreamData(currentStream, uniqueUsers);
  }
  
  uniqueUsers.clear();
  updateOverlay(0);
}

async function loadPreviousStreamData(streamPath) {
  const savedData = await loadStreamData(streamPath);
  if (savedData && savedData.users) {
    // Restore previous users
    uniqueUsers = new Set(savedData.users);
    log(`Restored ${uniqueUsers.size} users from previous visit to ${streamPath}`);
    updateOverlay(uniqueUsers.size, true); // Show restored indicator
    return true;
  }
  return false;
}

function scanMessages() {
  // Try multiple selectors for chat container
  const possibleChatSelectors = [
    '#channel-chatroom > div:nth-child(2) > div:nth-child(2)',
    '[data-testid="chat-messages"]',
    '.chat-messages',
    '#chatroom .messages'
  ];
  
  let chatBox = null;
  for (const selector of possibleChatSelectors) {
    chatBox = document.querySelector(selector);
    if (chatBox) break;
  }
  
  if (!chatBox) return;
  
  const messages = chatBox.querySelectorAll("div");
  messages.forEach(msg => {
    // Improved username extraction with multiple patterns
    const text = msg.innerText || msg.textContent || '';
    const patterns = [
      /^([^:]+):/,  // Original pattern
      /^\s*@?([a-zA-Z0-9_-]+)\s*:/,  // Username with optional @
      /data-username="([^"]+)"/  // Attribute-based detection
    ];
    
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        const user = match[1].trim();
        if (user && user.length > 0 && !uniqueUsers.has(user)) {
          uniqueUsers.add(user);
          updateOverlay(uniqueUsers.size);
          break;
        }
      }
    }
  });
}

function startObserver() {
  // Try multiple selectors for chat container
  const possibleChatSelectors = [
    '#channel-chatroom > div:nth-child(2) > div:nth-child(2)',
    '[data-testid="chat-messages"]',
    '.chat-messages',
    '#chatroom .messages'
  ];
  
  let chatBox = null;
  for (const selector of possibleChatSelectors) {
    chatBox = document.querySelector(selector);
    if (chatBox) break;
  }
  
  if (!chatBox) {
    setTimeout(startObserver, 500);
    return;
  }
  if (chatObserver) chatObserver.disconnect();
  chatObserver = new MutationObserver(scanMessages);
  chatObserver.observe(chatBox, { childList: true, subtree: true });
  scanMessages();
}

function isLiveStreamPath(path) {
  return /^\/[^\/]+$/.test(path) && path.length > 1;
}

async function handleStreamChange() {
  setInterval(async () => {
    const newPath = window.location.pathname;
    if (newPath !== currentStream && isLiveStreamPath(newPath)) {
      log(`Stream changed from ${currentStream} to ${newPath}`);
      
      // Save current stream data before switching
      if (uniqueUsers.size > 0 && currentStream && isLiveStreamPath(currentStream)) {
        await saveStreamData(currentStream, uniqueUsers);
        log(`Saved ${uniqueUsers.size} users for ${currentStream}`);
      }
      
      // Update current stream
      currentStream = newPath;
      
      // Try to load previous data for the new stream
      const hadPreviousData = await loadPreviousStreamData(newPath);
      
      if (!hadPreviousData) {
        // No previous data, start fresh
        uniqueUsers.clear();
        updateOverlay(0);
        log(`Starting fresh count for new stream: ${newPath}`);
      }
      
      // Start observing the new stream
      startObserver();
    }
  }, 1000);
}

// Initialize stream data loading
async function initializeStreamData() {
  log(`Initializing stream data for: ${currentStream}`);
  
  if (isLiveStreamPath(currentStream)) {
    const hadPreviousData = await loadPreviousStreamData(currentStream);
    if (!hadPreviousData) {
      log(`No previous data found for ${currentStream}, starting fresh`);
    }
  }
  
  // Clean up old data periodically
  clearOldStreamData();
}

window.addEventListener("load", async () => {
  createOverlay();
  await initializeStreamData();
  startObserver();
  handleStreamChange();
  setInterval(() => updateOverlay(uniqueUsers.size), 5000);
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  try {
    if (request.type === "GET_VIEW_STATS") {
      const stats = {
        real: uniqueUsers.size,
        official: getOfficialViewerCount(),
        streamPath: currentStream,
        hasPreviousData: uniqueUsers.size > 0
      };
      log('Sending stats:', stats);
      sendResponse(stats);
    }
    if (request.type === "RESET_VIEW_COUNTER") {
      log('Resetting counter (manual reset)');
      resetCounter();
      sendResponse({ success: true });
    }
    if (request.type === "SAVE_CURRENT_DATA") {
      log('Manually saving current data');
      if (uniqueUsers.size > 0 && currentStream && isLiveStreamPath(currentStream)) {
        saveStreamData(currentStream, uniqueUsers).then(() => {
          sendResponse({ success: true, saved: uniqueUsers.size });
        });
      } else {
        sendResponse({ success: false, message: "No data to save" });
      }
      return true; // Keep message channel open for async response
    }
    if (request.type === "CLEAR_STREAM_DATA") {
      log('Clearing all stored stream data');
      if (browserAPI && browserAPI.storage) {
        browserAPI.storage.local.clear().then(() => {
          sendResponse({ success: true });
        });
      } else {
        sendResponse({ success: false });
      }
      return true;
    }
  } catch (error) {
    log('Error handling message:', error);
    sendResponse({ error: error.message });
  }
  
  // Return true for async response (required for proper cross-browser support)
  return true;
});
