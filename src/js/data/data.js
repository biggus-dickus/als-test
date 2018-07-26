export const SHADES_OF_BLUE = {
    'cyan': 'Циан',
    'deep-blue': 'Глубокий',
    'indigo': 'Индиго',
    'light-blue': 'Голубой',
    'navy-blue': 'Морской',
    'royal-blue': 'Королевский',
    'sky-blue': 'Небесный'
};

export const DICTIONARY = {
  'L': 'л',
  can: 'банка',
  package: 'состав заказа',
  comment: 'комментарий',
  contactPerson: 'контактное лицо'
}

export const INITIAL_STATE = {
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
}
