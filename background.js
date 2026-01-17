// Background script without ES Module
function initBackground() {
  console.log('Background script initialized');
}

// Make function globally available if needed
window.initBackground = initBackground;

// Initialize when loaded
initBackground();
