// Simple popup test - Add this temporarily to popup.js for debugging

console.log('=== Popup Debug Test ===');
console.log('1. Popup script loaded');

document.addEventListener("DOMContentLoaded", () => {
  console.log('2. DOM Content Loaded');
  
  // Test element access
  const realCountEl = document.getElementById("realCount");
  const officialCountEl = document.getElementById("officialCount");
  const resetBtn = document.getElementById("resetBtn");
  
  console.log('3. Elements found:', {
    realCount: !!realCountEl,
    officialCount: !!officialCountEl,
    resetBtn: !!resetBtn
  });
  
  // Test browser API
  const browserAPI = typeof chrome !== 'undefined' ? chrome : 
                    typeof browser !== 'undefined' ? browser : null;
  
  console.log('4. Browser API available:', !!browserAPI);
  
  if (realCountEl) {
    realCountEl.textContent = "TEST";
    console.log('5. Set test text');
  }
  
  console.log('=== Debug Test Complete ===');
});
