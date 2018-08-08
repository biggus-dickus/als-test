import {DICTIONARY} from '../../data/data';
import getRandomInt from '../../utilities/random-number';
import insertTemplate from '../../utilities/insert-template';

import appState from '../../state/state';
import OrderFormView from './order-form-view';
import TableRow from '../table-row/table-row';

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
            new TableRow({
                tint: 'cyan',
                index: getRandomInt(4, 10),
                isFirstRow: false,
                totalRows: 4,
                color: DICTIONARY['blue'],
                isChecked: true,
                amount: getRandomInt(1, 5),
                unit: DICTIONARY['L'],
                container: DICTIONARY.can
            }).render(this._view.table.tBodies[0]);
        };

        insertTemplate(this._view.element);
    }
}
