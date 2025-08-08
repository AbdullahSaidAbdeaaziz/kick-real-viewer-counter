// Cross-browser compatible popup script
document.addEventListener("DOMContentLoaded", () => {
  const realCountEl = document.getElementById("realCount");
  const officialCountEl = document.getElementById("officialCount");
  const ratioEl = document.getElementById("ratio");
  const streamPathEl = document.getElementById("streamPath");
  const resetBtn = document.getElementById("resetBtn");
  const refreshBtn = document.getElementById("refreshBtn");
  const saveBtn = document.getElementById("saveBtn");
  const clearBtn = document.getElementById("clearBtn");

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

  function refreshData() {
    if (!browserAPI) {
      realCountEl.textContent = "API Error";
      officialCountEl.textContent = "API Error";
      return;
    }

    browserAPI.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs[0]) {
        console.error('No active tab found');
        realCountEl.textContent = "No Tab";
        officialCountEl.textContent = "No Tab";
        return;
      }
        console.error('No active tab found');
        return;
      
      browserAPI.tabs.sendMessage(tabs[0].id, { type: "GET_VIEW_STATS" }, (response) => {
        // Handle different error checking for different browsers
        const hasError = browserAPI.runtime.lastError || 
                        (typeof browser !== 'undefined' && !response);
        
        if (hasError) {
          console.error('Error sending message:', browserAPI.runtime.lastError);
          realCountEl.textContent = "Error";
          officialCountEl.textContent = "Error";
          return;
        }
        
        if (!response) {
          console.warn('No response from content script');
          realCountEl.textContent = "N/A";
          officialCountEl.textContent = "N/A";
          return;
        }
        
        realCountEl.textContent = response.real ?? "0";
        officialCountEl.textContent = response.official ?? "—";
        
        // Show stream path
        if (response.streamPath) {
          streamPathEl.textContent = response.streamPath.replace('/', '') || "—";
        } else {
          streamPathEl.textContent = "—";
        }
        
        if (response.official && response.real) {
          const percent = ((response.real / response.official) * 100).toFixed(1);
          ratioEl.textContent = `${percent}%`;
        } else {
          ratioEl.textContent = "—";
        }
        
        // Add visual indicator if this stream has previous data
        if (response.hasPreviousData && response.real > 0) {
          realCountEl.style.color = "#00ff00";
          realCountEl.title = "Restored from previous session";
        } else {
          realCountEl.style.color = "";
          realCountEl.title = "";
        }
      });
    });
  }

  // Load data on popup open
  refreshData();

  // Refresh button event listener
  refreshBtn.addEventListener("click", refreshData);

  // Save button event listener
  saveBtn.addEventListener("click", () => {
    if (!browserAPI) return;
    
    browserAPI.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs[0]) return;
      
      browserAPI.tabs.sendMessage(tabs[0].id, { type: "SAVE_CURRENT_DATA" }, (response) => {
        if (response && response.success) {
          saveBtn.textContent = `✅ Saved ${response.saved}`;
          setTimeout(() => {
            saveBtn.textContent = "💾 Save Data";
          }, 2000);
        } else {
          saveBtn.textContent = "❌ No Data";
          setTimeout(() => {
            saveBtn.textContent = "💾 Save Data";
          }, 2000);
        }
      });
    });
  });

  // Clear all data button
  clearBtn.addEventListener("click", () => {
    if (!browserAPI) return;
    
    if (confirm("Clear all saved stream data? This cannot be undone.")) {
      browserAPI.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (!tabs[0]) return;
        
        browserAPI.tabs.sendMessage(tabs[0].id, { type: "CLEAR_STREAM_DATA" }, (response) => {
          if (response && response.success) {
            clearBtn.textContent = "✅ Cleared";
            setTimeout(() => {
              clearBtn.textContent = "🗑️ Clear All Data";
            }, 2000);
            // Refresh data to show cleared state
            setTimeout(refreshData, 500);
          }
        });
      });
    }
  });

  resetBtn.addEventListener("click", () => {
    if (!browserAPI) {
      console.error('Browser API not available');
      return;
    }
    
    browserAPI.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs[0]) {
        console.error('No active tab found');
        return;
      }
      
      browserAPI.tabs.sendMessage(tabs[0].id, { type: "RESET_VIEW_COUNTER" }, (response) => {
        const hasError = browserAPI.runtime.lastError || 
                        (typeof browser !== 'undefined' && !response);
        
        if (hasError) {
          console.error('Error resetting counter:', browserAPI.runtime.lastError);
          return;
        }
        
        realCountEl.textContent = "0";
        ratioEl.textContent = "—";
      });
    });
  });
});
