// Content script loader - dynamically imports the real content script
(async () => {
  try {
    const src = chrome.runtime.getURL('content-script.js');
    await import(src);
  } catch (error) {
    console.error('Error loading content script:', error);
  }
})();
