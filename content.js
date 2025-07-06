let uniqueUsers = new Set();
let currentStream = window.location.pathname;
let overlay;
let chatObserver;

function createOverlay() {
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

  // Add dragging functionality
  let offsetX = 0, offsetY = 0, isDragging = false;

  overlay.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - overlay.getBoundingClientRect().left;
    offsetY = e.clientY - overlay.getBoundingClientRect().top;
    overlay.style.transition = "none"; // Disable animation during drag
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      overlay.style.left = `${e.clientX - offsetX}px`;
      overlay.style.top = `${e.clientY - offsetY}px`;
      overlay.style.right = "auto"; // Unset right to allow dragging anywhere
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
}


function getOfficialViewerCount() {
  const digitHeight = 25;
  const digitWrapper = document.querySelector(
    '#channel-content > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > span > span:nth-child(1) > div.flex'
  );
  if (!digitWrapper) return null;

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
    ratio = `\n🎥 Live Viewers: ${official} (${percentage}% Active)`;
  }
  overlay.firstChild.textContent = `💬 Real Chat Viewers: ${count}${ratio}`;
}

function resetCounter() {
  uniqueUsers.clear();
  updateOverlay(0);
}

function scanMessages() {
  const chatBox = document.querySelector('#channel-chatroom > div:nth-child(2) > div:nth-child(2)');
  if (!chatBox) return;

  const messages = chatBox.querySelectorAll("div");
  messages.forEach(msg => {
    const match = msg.innerText.match(/^([^:]+):/);
    if (match) {
      const user = match[1].trim();
      if (user && !uniqueUsers.has(user)) {
        uniqueUsers.add(user);
        updateOverlay(uniqueUsers.size);
      }
    }
  });
}

function startObserver() {
  const chatBox = document.querySelector('#channel-chatroom > div:nth-child(2) > div:nth-child(2)');
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
