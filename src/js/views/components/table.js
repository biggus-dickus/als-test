import {DICTIONARY} from '../../data/data';
import {SHADES_OF_BLUE} from '../../data/data';

import selectView from './select';

export default function renderTable (rows) {
    const colors = Object.keys(rows);

    if (!rows || rows.length === 0) {
        return '';
    }

    const selectOptions = [];
    Object.entries(SHADES_OF_BLUE)
        .map(([en, ru]) => selectOptions.push({
            name: ru.charAt(0).toUpperCase() + ru.substr(1),
            value: en
        }));

    const renderRows = () => colors.map((color) => {
        const tints = rows[color];

        return tints.map((tint, i) => {
            const select = selectView(selectOptions, tint.tint, {
                class: 'select order-table__input',
                name: 'tint-' + i,
                id: 'tint-' + i
            });

            const firstCell = (i === 0) ?
                `<td rowspan="${tints.length}" class="order-table__rowspan-td">
                    <span class="order-table__color-val">${DICTIONARY[color]}</span>
                </td>` : '';

            const checkboxCell = `
                <td>
                    <input type="checkbox" class="checkbox-input visually-hidden" id="toggle-${tint.tint}" checked=${tint.isChecked}>
                    <label for="toggle-${tint.tint}" class="order-table__label" title="Отметить ${SHADES_OF_BLUE[tint.tint]}">
                     <span class="visually-hidden">Отметить ${SHADES_OF_BLUE[tint.tint]}</span>
                  </label>
                </td>`;

            const selectCell = `<td>${select}</td>`;

            const amountCell = `
                <td class="order-table__amount-td">
                    <input type="number" name="${tint.tint}-amount" class="text-input order-table__num-input" value="${tint.amount}">
                    <span class="order-table__amount">${tint.unit}</span>
                </td>`;

            const containerCell = `<td class="order-table__unit-td">${tint.container}</td>`;

            const btnCell = `
                <td>
                    <button type="button" class="remove-btn order-table__remove" title="Убрать ${SHADES_OF_BLUE[tint.tint]}">
                         <span class="visually-hidden">Убрать ${SHADES_OF_BLUE[tint.tint]}</span>
                    </button>
                </td>`;

            const cells = [firstCell, checkboxCell, selectCell, amountCell, containerCell, btnCell].filter((cell) => cell);

            return `<tr>${cells}</tr>`;
        });
    });

    return `
        <table class="order-table order-form__table js-table">
            <thead>
            <tr>
                <th class="order-table__color-th">Цвет</th>
                <th class="order-table__checkbox-th">
                    <input type="checkbox" class="checkbox-input visually-hidden" id="toggle-all" checked>
                    <label for="toggle-all" class="order-table__label" title="Отметить все">
                        <span class="visually-hidden">Отметить все</span>
                    </label>
                </th>
                <th class="order-table__tint-th">Оттенок</th>
                <th class="order-table__amount-th">Объем</th>
                <th class="order-table__unit-th">Упаковка</th>
                <th class="order-table__buttons-th">
                    <button type="button" class="remove-btn order-table__remove" title="Убрать все">
                    <span class="visually-hidden">Убрать все</span>
                    </button>
                </th>
            </tr>
            </thead>
            <tbody>${renderRows()}</tbody>
        </table>`.replace(/,/g, '');
}
