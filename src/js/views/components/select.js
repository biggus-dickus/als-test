/**
 * Render form <select> with options provided in an array of objects.
 * @param {Array} options
 * @param {string} selectedOption
 * @param {Object} config
 * @return {string}
 */
export default function renderSelect (options, selectedOption, config) {
    const attrs = Object.keys(config).map((key) => `${key}="${config[key]}"`);

    const selectOptions = options.map((opt) => {
        const isSelected = (opt.value === selectedOption) ? 'selected' : '';

        return `<option value="${opt.value}" ${isSelected}>${opt.name}</option>`;
    });

    return `<select ${attrs.join(' ')}>${selectOptions}</select>`;
}
