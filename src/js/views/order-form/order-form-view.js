import AbstractView from '../view';

import buttonView from '../components/button';
import sidebarView from '../components/sidebar';
import tableView from '../components/table';
import titleView from '../components/title';

export default class OrderFormView extends AbstractView {
    constructor (state) {
        super();
        this._state = state;
    }

    get template () {
        const {colors} = this._state.props;

        return `
        <form action="?" method="get" class="order-form">
            <section class="order-form__body">
                ${titleView(colors.blue.length)}
                ${tableView(colors)}
                ${buttonView()}
            </section>
            ${sidebarView()}
        </form>`;
    }

    bind () {
        const btn = this.element.querySelector('.order-form__btn');
        btn.addEventListener('click', this.onClick);

        const addRowBtn = this.element.querySelector('.js-add-row');
        addRowBtn.addEventListener('click', this.onRowAdd);
    }

    onClick () {}

    onRowAdd () {}
}
