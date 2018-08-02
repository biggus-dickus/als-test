import insertTemplate from '../../utilities/insert-template';
import OrderFormView from './order-form-view';

export default class OrderForm {
    constructor () {
        this._view = new OrderFormView();
    }

    render () {
        this._view.onClick = (e) => {
            e.preventDefault();
            console.dir(e);
        };

        insertTemplate(this._view.element);
    }
}
