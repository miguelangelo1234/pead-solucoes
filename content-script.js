// Content script as ES Module
export function initContentScript() {
  console.log('Content script initialized as ES Module');
}

// Example function that could be exported
export function exampleFunction() {
  return 'This is an exported function from an ES Module';
}

// Initialize when loaded
initContentScript();
