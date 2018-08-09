import getRandomInt from '../utilities/random-number';

export const SHADES_OF_BLUE = {
    'cyan': 'циан',
    'deep-blue': 'глубокий',
    'indigo': 'индиго',
    'light-blue': 'голубой',
    'navy-blue': 'морской',
    'royal-blue': 'королевский',
    'sky-blue': 'небесный'
};

export const DICTIONARY = {
    'L': 'л',
    can: 'банка',
    package: 'состав заказа',
    comment: 'комментарий',
    contactPerson: 'контактное лицо',
    blue: 'синий'
};

export const INITIAL_STATE = Object.freeze({
    currentSection: DICTIONARY.package,
    colors: {
        blue: [
            {
                tint: 'sky-blue',
                amount: 1,
                unit: DICTIONARY['L'],
                container: DICTIONARY.can,
                isChecked: true
            },
            {
                tint: 'light-blue',
                amount: 2,
                unit: DICTIONARY['L'],
                container: DICTIONARY.can,
                isChecked: true
            },
            {
                tint: 'deep-blue',
                amount: 1,
                unit: DICTIONARY['L'],
                container: DICTIONARY.can,
                isChecked: true
            },
            {
                tint: 'royal-blue',
                amount: 3,
                unit: DICTIONARY['L'],
                container: DICTIONARY.can,
                isChecked: true
            }
        ]
    }
});
