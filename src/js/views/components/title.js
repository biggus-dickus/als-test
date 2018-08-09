export const generateTitleText = (num) => {
    switch (num) {
        case 0:
            return 'Добавьте оттенок';
        case 1:
            return `Выбран ${num} оттенок`;
        case 2:
        case 3:
        case 4:
            return `Выбраны ${num} оттенка`;
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
            return `Выбраны ${num} оттенков`;
        default:
            return `Выбрано оттенков: ${num}`;
    }
};

export default function renderTitle (tintsCount) {
    return `<h2 class="title title--secondary order-form__title js-title">${generateTitleText(tintsCount)}</h2>`;
}
