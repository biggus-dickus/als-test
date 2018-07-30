/**
 * Insert all template contents into a specified DOM node (<main> by default).
 * @param {Element} templateContents
 * @param {Element} container
 */
export default function insertTemplate (templateContents, container = document.querySelector('main')) {
    container.innerHTML = '';
    container.appendChild(templateContents);
}
