/**
 * Render form <select> with options provided in an array of objects.
 * @param {Array} options
 * @param {string} className
 * @param {string} name
 * @param {string} id
 * @return {string}
 */
export default function renderSelect (options, className, name, id) {
    const selectOpions = options.map((opt) => `<option value=${opt.value}>${opt.name}</option>`);

    return `<select name=${name} id=${id} class=${className}>${selectOpions}</select>`;
}
