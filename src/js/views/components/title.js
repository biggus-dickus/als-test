/**
 * Etot trudni russky yezik.
 * @param {int} tintsCount
 * @return {string}
 */
export default function renderTitle (tintsCount) {
    let textNode = '';

    switch (tintsCount) {
        case 0:
            textNode = `Выбрано ${tintsCount} оттенков`;
            break;
        case 1:
            textNode = `Выбран ${tintsCount} оттенок`;
            break;
        case 2:
        case 3:
        case 4:
            textNode = `Выбраны ${tintsCount} оттенка`;
            break;
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
            textNode = `Выбраны ${tintsCount} оттенков`;
            break;
        default:
            textNode = `Выбрано оттенков: ${tintsCount}`;
    }

    return `<h2 class="title title--secondary order-form__title">${textNode}</h2>`;
}
