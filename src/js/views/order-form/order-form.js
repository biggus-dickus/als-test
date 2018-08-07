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
            console.dir(e);
        };

        this._view.onRowAdd = (e) => {
            new TableRow().render(this._view.table.tBodies[0]);
        };

        insertTemplate(this._view.element);
    }
}
