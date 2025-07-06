document.addEventListener("DOMContentLoaded", () => {
  const realCountEl = document.getElementById("realCount");
  const officialCountEl = document.getElementById("officialCount");
  const ratioEl = document.getElementById("ratio");
  const resetBtn = document.getElementById("resetBtn");

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { type: "GET_VIEW_STATS" }, (response) => {
      if (!response) return;
      realCountEl.textContent = response.real ?? "0";
      officialCountEl.textContent = response.official ?? "—";
      if (response.official && response.real) {
        const percent = ((response.real / response.official) * 100).toFixed(1);
        ratioEl.textContent = `${percent}%`;
      }
    });
  });

  resetBtn.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { type: "RESET_VIEW_COUNTER" });
      realCountEl.textContent = "0";
      ratioEl.textContent = "—";
    });
  });
});
