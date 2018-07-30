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
    contactPerson: 'контактное лицо'
};

export const INITIAL_STATE = Object.freeze({
    currentSection: DICTIONARY.package,
    colors: {
        blue: [
            {
                tint: SHADES_OF_BLUE['sky-blue'],
                amount: 1,
                unit: DICTIONARY['L'],
                container: DICTIONARY.can
            },
            {
                tint: SHADES_OF_BLUE['light-blue'],
                amount: 2,
                unit: DICTIONARY['L'],
                container: DICTIONARY.can
            },
            {
                tint: SHADES_OF_BLUE['deep-blue'],
                amount: 1,
                unit: DICTIONARY['L'],
                container: DICTIONARY.can
            },
            {
                tint: SHADES_OF_BLUE['royal-blue'],
                amount: 3,
                unit: DICTIONARY['L'],
                container: DICTIONARY.can
            }
        ]
    }
});
