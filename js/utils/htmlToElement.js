/**
 * Function that converts an HTML string to a DOM element
 * @param {string} html the html string
 * @returns DOM element
 */

export function htmlToElement(html) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();

  return template.content.firstChild;
}