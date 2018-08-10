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
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this._updateIndexes = this._updateIndexes.bind(this);
    }

    render () {
        this._view.onAllRowsToggle = this.onAllRowsToggle;
        this._view.onAllRowsRemove = this.onAllRowsRemove;
        this._view.onRowAdd = this.addRow;
        this._view.onSubmit = this.onFormSubmit;

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
            OrderForm.addTint(newTint);
        }

        new TableRow({
            ...tintToadd,
            isFirstRow: (initialTint) ? isFirst : appState.props.colors.blue.length === 1,
            rowIndex: (index >= 0) ? index : appState.props.colors.blue.length - 1,
            color: VOCABULARY['blue'],
            onRowRemove: this.removeRow,
            updateIndexes: this._updateIndexes
        }).render(this._view.table.tBodies[0]);

        if (this._view.submitBtn.disabled) {
            this._view.submitBtn.removeAttribute('disabled');
        }

        this._updateRowspan(appState.props.colors.blue.length);
        this._updateTitle();
    }

    /**
     * Remove row from table, update state.
     * @param {int} index
     */
    removeRow (index) {
        this._rowSpanCell = this._view.table.querySelector('.js-rowspan');
        OrderForm.removeTint(index);
        this._updateRowspan(appState.props.colors.blue.length);
        this._updateTitle();

        if (!appState.props.colors.blue.length) {
            this._view.submitBtn.disabled = true;
        }
    }

    onAllRowsToggle () {
        OrderForm.toggleAllTints(this._view.masterCheckbox.checked);

        const checkboxes = this._view.table.querySelectorAll('.js-toggle-row');
        for (let checkbox of checkboxes) {
            checkbox.checked = this._view.masterCheckbox.checked;
        }

        this._updateTitle();
    }

    onAllRowsRemove () {
        OrderForm.removeAllTints();

        this._view.table.tBodies[0].innerHTML = '';
        this._view.submitBtn.disabled = true;

        this._updateTitle();
    }

    onFormSubmit (e) {
        e.preventDefault();
        alert('Не дови на меня!');
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
            this._updateRowspan(appState.props.colors.blue.length);
        }

        this._rowSpanCell = null;
    }

    /**
     * Update selected tints total in the title.
     * @private
     */
    _updateTitle () {
        const activeTints = appState.props.colors.blue.filter((tint) => tint.isChecked);
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
        appState.props.colors.blue.forEach((color, i) => this.addRow(null, i === 0, color, i));
    }

    /**
     * Push new tint to appState array.
     * @param {Object} color
     */
    static addTint (color) {
        const newState = {...appState.props};
        const newTints = newState.colors.blue;

        newTints.push(color);
        appState.setState(newState);
    }

    /**
     * Remove the specified tint from appState array.
     * @param {int} colorIndex
     */
    static removeTint (colorIndex) {
        const newState = {...appState.props};
        const newTints = newState.colors.blue;

        newTints.splice(colorIndex, 1);
        appState.setState(newState);
    }

    /**
     * Check or uncheck all tints in the appState.
     * @param {boolean} flag
     */
    static toggleAllTints (flag) {
        const newState = {...appState.props};
        const newTints = newState.colors.blue;

        newTints.forEach((color) => color.isChecked = flag);
        appState.setState(newState);
    }

    static removeAllTints () {
        const newState = {...appState.props};
        const newTints = newState.colors.blue;

        newTints.length = 0;
        appState.setState(newState);
    }
}
