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
            <section class="order-form__body js-body">
                ${titleView(colors.blue.length)}
                ${tableView(colors)}
                ${buttonView()}
            </section>
            ${sidebarView()}
        </form>`;
    }

    bind () {
        this.body = this.element.querySelector('.js-body');
        this.table = this.element.querySelector('.js-table');
        this.rowSpanCell = this.element.querySelector('.js-rowspan');

        const btn = this.element.querySelector('.order-form__btn');
        btn.addEventListener('click', this.onClick);

        const addRowBtn = this.element.querySelector('.js-add-row');
        addRowBtn.addEventListener('click', this.onRowAdd);
    }

    onClick () {}

    onRowAdd () {}
}
