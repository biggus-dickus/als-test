import insertTemplate from '../../utilities/insert-template';

import appState from '../../state/state';
import OrderFormView from './order-form-view';

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

        };

        insertTemplate(this._view.element);
    }
}
