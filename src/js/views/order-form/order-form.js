import {DICTIONARY, SHADES_OF_BLUE} from '../../data/data';
import getRandomInt from '../../utilities/random-number';
import insertTemplate from '../../utilities/insert-template';

import appState from '../../state/state';

import {generateTitleText} from '../components/title';
import OrderFormView from './order-form-view';
import TableRow from '../table-row/table-row';

export default class OrderForm {
    constructor () {
        this._view = new OrderFormView(appState);

        this.onRowAdd = this.onRowAdd.bind(this);
        this.onRowRemove = this.onRowRemove.bind(this);
        this.onAllRowsRemove = this.onAllRowsRemove.bind(this);
        this.onAllRowsToggle = this.onAllRowsToggle.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.updateIndexes = this.updateIndexes.bind(this);
    }

    render () {
        this._view.onAllRowsToggle = this.onAllRowsToggle;
        this._view.onAllRowsRemove = this.onAllRowsRemove;
        this._view.onRowAdd = this.onRowAdd;
        this._view.onSubmit = this.onFormSubmit;

        insertTemplate(this._view.element);
    }

    /**
     * Add row to table, update appState.
     */
    onRowAdd () {
        const tints = Object.keys(SHADES_OF_BLUE);
        const newTint = {
            tint: tints[Math.floor(Math.random() * tints.length)],
            amount: getRandomInt(1, 5),
            unit: DICTIONARY['L'],
            container: DICTIONARY.can,
            isChecked: true
        };

        OrderForm.addTint(newTint);

        new TableRow({
            ...newTint,
            rowIndex: appState.props.colors.blue.length - 1,
            isFirstRow: false,
            color: DICTIONARY['blue'],
            onRowRemove: this.onRowRemove,
            updateIndexes: this.updateIndexes
        }).render(this._view.table.tBodies[0]);

        if (this._view.submitBtn.disabled) {
            this._view.submitBtn.removeAttribute('disabled');
        }

        this.updateRowspan(appState.props.colors.blue.length);
        this.updateTitle();
    }

    /**
     * Remove row from table, update state.
     * @param {int} index
     */
    onRowRemove (index) {
        OrderForm.removeTint(index);
        this.updateRowspan(appState.props.colors.blue.length);
        this.updateTitle();

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
    }

    onAllRowsRemove () {
        OrderForm.removeAllTints();

        this._view.table.tBodies[0].innerHTML = '';
        this._view.submitBtn.disabled = true;

        this.updateTitle();
    }

    onFormSubmit (e) {
        e.preventDefault();
        alert('Не дови на меня!');
    }

    /**
     * Update tints total in the title.
     */
    updateTitle () {
        this._view.title.textContent = generateTitleText(appState.props.colors.blue.length);
    }

    /**
     * Make sure the interface "data-index" attributes still match
     * their respective color position in appState after array splicing.
     */
    updateIndexes () {
        const rows = [...this._view.table.tBodies[0].querySelectorAll('tr')];

        rows.forEach((row, i) => {
            const indexes = [...row.querySelectorAll('[data-index]')];
            indexes.forEach((index) => index.dataset.index = i);
        });
    }

    /**
     * Make sure html table rowspan keeps up with the tints length.
     * @param {int} num
     */
    updateRowspan (num) {
        if (this._view.rowSpanCell) {
            this._view.rowSpanCell.setAttribute('rowspan', num);
        }
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
