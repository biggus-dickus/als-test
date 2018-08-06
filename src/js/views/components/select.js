/**
 * Render form <select> with options provided in an array of objects.
 * @param {Array} options
 * @param {string} selectedOption
 * @param {Array} classList
 * @param {string} name
 * @param {string} id
 * @return {string}
 */
export default function renderSelect (options, selectedOption, {classList, name, id}) {
    const selectOpions = options.map((opt) => {
        const selectedAttr = (opt.value === selectedOption) ? 'selected' : '';

        return `
        <option value="${opt.value}" ${selectedAttr}>
            ${opt.name}
        </option>`;
    });

    return `
        <select name="${name}" id="${id}" class="${classList.join(' ')}">
            ${selectOpions}
        </select>`;
}
