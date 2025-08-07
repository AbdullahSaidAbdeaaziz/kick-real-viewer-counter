// content.js
let uniqueUsers = new Set();
let currentStream = window.location.pathname;
let overlay;
let chatObserver;
let debugMode = false; // Set to true for debugging

function log(message, ...args) {
  if (debugMode) {
    console.log('[Kick Real Viewer Counter]', message, ...args);
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

function updateOverlay(count) {
  if (!overlay) createOverlay();
  const official = getOfficialViewerCount();
  let ratio = '';
  if (official && official > 0) {
    const percentage = ((count / official) * 100).toFixed(1);
    ratio = ` / 👁 ${official} (${percentage}% Active)`;
  }
  overlay.textContent = `💬 ${count}${ratio}`;
}

function resetCounter() {
  uniqueUsers.clear();
  updateOverlay(0);
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

function resetOnStreamChange() {
  setInterval(() => {
    const newPath = window.location.pathname;
    if (newPath !== currentStream && isLiveStreamPath(newPath)) {
      currentStream = newPath;
      resetCounter();
      startObserver();
    }
  }, 1000);
}

window.addEventListener("load", () => {
  createOverlay();
  startObserver();
  resetOnStreamChange();
  setInterval(() => updateOverlay(uniqueUsers.size), 5000);
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  try {
    if (request.type === "GET_VIEW_STATS") {
      const stats = {
        real: uniqueUsers.size,
        official: getOfficialViewerCount(),
      };
      log('Sending stats:', stats);
      sendResponse(stats);
    }
    if (request.type === "RESET_VIEW_COUNTER") {
      log('Resetting counter');
      resetCounter();
      sendResponse({ success: true });
    }
  } catch (error) {
    log('Error handling message:', error);
    sendResponse({ error: error.message });
  }
});
