import {DICTIONARY, SHADES_OF_BLUE} from '../../data/data';
import getRandomInt from '../../utilities/random-number';
import insertTemplate from '../../utilities/insert-template';

import appState from '../../state/state';
import OrderFormView from './order-form-view';
import TableRow from '../table-row/table-row';
import titleView from '../components/title';

export default class OrderForm {
    constructor () {
        this._view = new OrderFormView(appState);
    }

    render () {
        this._view.onClick = (e) => {
            e.preventDefault();
            alert('Не дови на меня!');
        };

        this._view.onRowAdd = () => {
            const tints = Object.keys(SHADES_OF_BLUE);
            const newColor = {
                tint: tints[Math.floor(Math.random() * tints.length)],
                amount: getRandomInt(1, 5),
                unit: DICTIONARY['L'],
                container: DICTIONARY.can,
                isChecked: true
            };

            OrderForm.addColor(newColor);

            new TableRow({
                ...newColor,
                rowIndex: appState.props.colors.blue.length - 1,
                isFirstRow: false,
                color: DICTIONARY['blue'],
                onRowRemove: this.onRowRemove.bind(this)
            }).render(this._view.table.tBodies[0]);

            this.updateRowspan(appState.props.colors.blue.length);
        };

        insertTemplate(this._view.element);
    }

    onRowRemove (index) {
        OrderForm.removeColor(index);
        this.updateRowspan(appState.props.colors.blue.length);
    }

    updateTitle () {
        this._view.body.children[0].remove();
        this._view.body.insertBefore(titleView(appState.props.colors.blue.length), this._view.table);
    }

    updateRowspan (num) {
        if (this._view.rowSpanCell) {
            this._view.rowSpanCell.setAttribute('rowspan', num);
        }
    }

    /**
     * Push new color to appState array.
     * @param {Object} color
     */
    static addColor (color) {
        const newState = {...appState.props};
        const newColors = newState.colors.blue;

        newColors.push(color);
        appState.setState(newState);
        console.log(appState.props.colors.blue);
    }

    /**
     * Remove the specified color from appState array.
     * @param {int} colorIndex
     */
    static removeColor (colorIndex) {
        const newState = {...appState.props};
        const newColors = newState.colors.blue;

        newColors.splice(colorIndex, 1);
        appState.setState(newState);

        console.log(appState.props.colors.blue);
    }
}
