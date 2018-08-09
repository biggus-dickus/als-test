import {SHADES_OF_BLUE} from '../../data/data';

import AbstractView from '../view';
import selectView from '../components/select';

export default class TableRowView extends AbstractView {
    constructor (data) {
        super();
        this._data = data;
    }

    get template () {
        const {_data} = this;
        if (!_data || !Object.keys(_data).length) {
            throw Error('To render the row, data must be provided.');
        }

        const selectOptions = [];
        Object.entries(SHADES_OF_BLUE)
            .map(([en, ru]) => selectOptions.push({
                name: ru.charAt(0).toUpperCase() + ru.substr(1),
                value: en
            }));

        const select = selectView(selectOptions, _data.tint, {
            class: 'select order-table__input',
            name: `tint-${_data.rowIndex}`,
            id: `tint-${_data.rowIndex}`
        });

        const firstCell = (_data.isFirstRow) ?
            `<td rowspan="${_data.rowIndex}" class="order-table__rowspan-td js-rowspan">
                <span class="order-table__color-val">${_data.color}</span>
            </td>` : '';

        const checkboxCell = `
            <td>
                <input type="checkbox" class="checkbox-input visually-hidden js-toggle-row" id="toggle-${_data.tint}-${_data.rowIndex}" checked=${_data.isChecked} data-index="${_data.rowIndex}">
                <label for="toggle-${_data.tint}-${_data.rowIndex}" class="order-table__label" title="Отметить оттенок">
                 <span class="visually-hidden">Отметить оттенок</span>
              </label>
            </td>`;

        const selectCell = `<td>${select}</td>`;

        const amountCell = `
            <td class="order-table__amount-td">
                <input type="number" name="${_data.tint}-amount" class="text-input order-table__num-input" value="${_data.amount}" data-index="${_data.rowIndex}">
                <span class="order-table__amount">${_data.unit}</span>
            </td>`;

        const containerCell = `<td class="order-table__unit-td">${_data.container}</td>`;

        const btnCell = `
            <td>
                <button type="button" class="js-remove-row remove-btn order-table__remove" data-index="${_data.rowIndex}" title="Убрать оттенок">
                     <span class="visually-hidden">Убрать оттенок</span>
                </button>
            </td>`;

        const cells = [firstCell, checkboxCell, selectCell, amountCell, containerCell, btnCell].filter((cell) => cell).join('');

        return `<tr>${cells}</tr>`;
    }

    bind () {
        this.removeBtn = this.element.querySelector('.js-remove-row');
        this.removeBtn.addEventListener('click', this.onRemove);
    }

    onRemove () {}
}
