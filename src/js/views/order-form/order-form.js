import {VOCABULARY, SHADES_OF_BLUE} from '../../data/data';
import getRandomInt from '../../utilities/random-number';
import insertTemplate from '../../utilities/insert-template';

import appState from '../../state/state';

import {generateTitleText} from '../components/title';
import OrderFormView from './order-form-view';
import TableRow from '../table-row/table-row';

export default class OrderForm {
    constructor () {
        this._view = new OrderFormView(appState);

        this.addRow = this.addRow.bind(this);
        this.removeRow = this.removeRow.bind(this);
        this.onAllRowsRemove = this.onAllRowsRemove.bind(this);
        this.onAllRowsToggle = this.onAllRowsToggle.bind(this);
        this.onRowToggle = this.onRowToggle.bind(this);
        this._updateIndexes = this._updateIndexes.bind(this);
    }

    render () {
        this._view.onAllRowsToggle = this.onAllRowsToggle;
        this._view.onAllRowsRemove = this.onAllRowsRemove;
        this._view.onRowAdd = this.addRow;
        this._view.onSubmit = OrderForm.onFormSubmit;

        insertTemplate(this._view.element);
        this._init();
    }

    /**
     * Add row to table, update appState.
     * @param {Event} e
     * @param {boolean} isFirst
     * @param {Object} initialTint
     * @param {int} index
     */
    addRow (e, isFirst = false, initialTint = null, index) {
        const tints = Object.keys(SHADES_OF_BLUE);
        const newTint = {
            tint: tints[Math.floor(Math.random() * tints.length)],
            amount: getRandomInt(1, 5),
            unit: VOCABULARY['L'],
            container: VOCABULARY.can,
            isChecked: true
        };

        const tintToadd = (initialTint) ? initialTint : newTint;
        if (!initialTint) {
            appState.addTint(newTint);
        }

        new TableRow({
            ...tintToadd,
            isFirstRow: (initialTint) ? isFirst : appState.state.colors.blue.length === 1,
            rowIndex: (index >= 0) ? index : appState.state.colors.blue.length - 1,
            color: VOCABULARY['blue'],
            onRowRemove: this.removeRow,
            onRowToggle: this.onRowToggle,
            updateIndexes: this._updateIndexes
        }).render(this._view.table.tBodies[0]);

        if (this._view.submitBtn.disabled) {
            this._view.submitBtn.removeAttribute('disabled');
        }

        this._updateRowspan(appState.state.colors.blue.length);
        this._updateTitle();
    }

    /**
     * Remove row from table, update state.
     * @param {int} rowIndex
     */
    removeRow (rowIndex) {
        this._rowSpanCell = this._view.table.querySelector('.js-rowspan');
        appState.removeTint(rowIndex);
        this._updateRowspan(appState.state.colors.blue.length);
        this._updateTitle();

        if (!appState.state.colors.blue.length) {
            this._view.submitBtn.disabled = true;
        }
    }

    /**
     * Update 'isChecked' prop of selected tint, update title accordingly.
     * @param {int} rowIndex
     * @param {boolean} toggleFlag
     */
    onRowToggle (rowIndex, toggleFlag) {
        appState.changeValue(rowIndex, 'isChecked', toggleFlag);
        this._updateTitle();

        this._view.submitBtn.disabled = !appState.state.colors.blue.some((tint) => tint.isChecked);
    }

    onAllRowsToggle () {
        const checkboxes = this._view.table.querySelectorAll('.js-toggle-row');
        if (!checkboxes.length) return;

        appState.toggleAllTints(this._view.masterCheckbox.checked);

        for (let checkbox of checkboxes) {
            checkbox.checked = this._view.masterCheckbox.checked;
        }

        this._updateTitle();
        this._view.submitBtn.disabled = !appState.state.colors.blue.some((tint) => tint.isChecked);
    }

    onAllRowsRemove () {
        if (!this._view.table.tBodies[0].children.length) return;
        appState.removeAllTints();

        this._view.table.tBodies[0].innerHTML = '';
        this._view.submitBtn.disabled = true;

        this._updateTitle();
    }

    /**
     * Re-insert the rowspan cell every time table's first row is removed
     * to keep design and table structure. Update the "rowspan" value.
     * @param rowIndex
     * @param container
     * @private
     */
    _onFirstRowRemove (rowIndex, container) {
        if (+rowIndex === 0 && container) {
            container.insertBefore(this._rowSpanCell, container.children[0]);
            this._updateRowspan(appState.state.colors.blue.length);
        }

        this._rowSpanCell = null;
    }

    /**
     * Update selected tints total in the title.
     * @private
     */
    _updateTitle () {
        const activeTints = appState.state.colors.blue.filter((tint) => tint.isChecked);
        this._view.title.textContent = generateTitleText(activeTints.length);
    }

    /**
     * Make sure the interface "data-index" attributes still match
     * their respective color position in the appState after array splicing.
     * @param {int|string} trIndex
     * @private
     */
    _updateIndexes (trIndex) {
        const rows = [...this._view.table.tBodies[0].querySelectorAll('tr')];

        rows.forEach((row, i) => {
            const indexes = [...row.querySelectorAll('[data-index]')];
            indexes.forEach((index) => index.dataset.index = i);
        });

        this._onFirstRowRemove(trIndex, rows[0]);
    }

    /**
     * Make sure html table td's rowspan keeps up with the tints length.
     * @param {int|string} num
     * @private
     */
    _updateRowspan (num) {
        const rowSpanCell = this._view.table.querySelector('.js-rowspan');
        if (rowSpanCell) {
            rowSpanCell.setAttribute('rowspan', num);
        }
    }

    _init () {
        appState.state.colors.blue
            .forEach((color, i) => this.addRow(null, i === 0, color, i));
    }

    static onFormSubmit (e) {
        e.preventDefault();
        const formData = [];

        appState.state.colors.blue
            .filter((tint) => tint.isChecked)
            .forEach((item, i) => {
                const j = ++i;
                formData.push(`tint${j}=${item.tint}&amount${j}=${item.amount}`);
            });

        alert('Форма отправит следующие данные:' + '\n'
            + 'color=blue&' + '\n'
            + formData.join('\n'));
    }
}
