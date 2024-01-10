import { htmlToElement } from './htmlToElement.js';

/**
 * Function that replace a child from it's parent.
 * If 'newNode' is a string, it will be converted to a node with the helper function 'htmlToElement'
 * @param {Node} parent Parent element
 * @param {Node} oldNode Node to be replaced
 * @param {Node} newNode Node to replace
 */
export function replaceChild(parent, oldNode, newNode) {
  if(typeof newNode === 'string') {
    newNode = htmlToElement(newNode);
  }
  parent.replaceChild(newNode, oldNode);
}