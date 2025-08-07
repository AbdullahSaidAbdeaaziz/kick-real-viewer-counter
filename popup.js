// Cross-browser compatible popup script
document.addEventListener("DOMContentLoaded", () => {
  const realCountEl = document.getElementById("realCount");
  const officialCountEl = document.getElementById("officialCount");
  const ratioEl = document.getElementById("ratio");
  const resetBtn = document.getElementById("resetBtn");
  const refreshBtn = document.getElementById("refreshBtn");

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
        if (response.official && response.real) {
          const percent = ((response.real / response.official) * 100).toFixed(1);
          ratioEl.textContent = `${percent}%`;
        } else {
          ratioEl.textContent = "—";
        }
      });
    });
  }

  // Load data on popup open
  refreshData();

  // Refresh button event listener
  refreshBtn.addEventListener("click", refreshData);

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
