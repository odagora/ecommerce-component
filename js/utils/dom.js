
/**
 * Function to select a DOM element with error handling
 * @param {string} selector - The CSS selector to use to select the element
 * @param {string} errorMessage - The error message to display if the element is not found
 * @returns {HTMLElement} - The selected element
 */
export function querySelectorWithError(selector, errorMessage) {
  const element = document.querySelector(selector);
  if (!element) {
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
  return element;
}