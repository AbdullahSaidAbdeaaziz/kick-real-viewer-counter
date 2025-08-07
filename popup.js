document.addEventListener("DOMContentLoaded", () => {
  const realCountEl = document.getElementById("realCount");
  const officialCountEl = document.getElementById("officialCount");
  const ratioEl = document.getElementById("ratio");
  const resetBtn = document.getElementById("resetBtn");
  const refreshBtn = document.getElementById("refreshBtn");

  function refreshData() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs[0]) {
        console.error('No active tab found');
        return;
      }
      
      chrome.tabs.sendMessage(tabs[0].id, { type: "GET_VIEW_STATS" }, (response) => {
        if (chrome.runtime.lastError) {
          console.error('Error sending message:', chrome.runtime.lastError);
          realCountEl.textContent = "Error";
          officialCountEl.textContent = "Error";
          return;
        }
        
        if (!response) {
          console.warn('No response from content script');
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
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs[0]) {
        console.error('No active tab found');
        return;
      }
      
      chrome.tabs.sendMessage(tabs[0].id, { type: "RESET_VIEW_COUNTER" }, (response) => {
        if (chrome.runtime.lastError) {
          console.error('Error resetting counter:', chrome.runtime.lastError);
          return;
        }
        
        realCountEl.textContent = "0";
        ratioEl.textContent = "—";
      });
    });
  });
});
