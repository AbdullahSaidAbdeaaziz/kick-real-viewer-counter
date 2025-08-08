// Test script to verify cross-browser compatibility
// Add this to content.js temporarily to test browser detection

console.log('=== Kick Real Viewer Counter - Browser Detection Test ===');

// Test browser API detection
if (typeof browser !== 'undefined' && browser.runtime) {
  console.log('✅ Firefox browser API detected');
  console.log('Browser info:', browser.runtime.getManifest());
} else if (typeof chrome !== 'undefined' && chrome.runtime) {
  console.log('✅ Chrome/Chromium browser API detected');
  console.log('Browser info:', chrome.runtime.getManifest());
} else {
  console.log('❌ No browser extension API found');
}

// Test DOM access
console.log('✅ DOM access:', document.readyState);
console.log('✅ Current URL:', window.location.href);
console.log('✅ User agent:', navigator.userAgent);

console.log('=== Test Complete ===');
