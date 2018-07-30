import insertTemplate from '../../utilities/insert-template';
import OrderFormView from './order-form-view';

export default class OrderForm {
    constructor () {
        this._view = new OrderFormView();
    }

    init () {
        insertTemplate(this._view.element);
    }
}
