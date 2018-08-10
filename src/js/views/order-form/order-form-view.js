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
                ${tableView()}
                ${buttonView()}
            </section>
            ${sidebarView()}
        </form>`;
    }

    bind () {
        this.body = this.element.querySelector('.js-body');
        this.title = this.body.querySelector('.js-title');

        this.table = this.body.querySelector('.js-table');

        this.masterCheckbox = this.table.querySelector('.js-master-checkbox');
        const masterRemove = this.table.querySelector('.js-master-remove');

        const addRowBtn = this.element.querySelector('.js-add-row');
        this.submitBtn = this.element.querySelector('.order-form__btn');

        addRowBtn.addEventListener('click', this.onRowAdd);
        this.masterCheckbox.addEventListener('change', this.onAllRowsToggle);
        masterRemove.addEventListener('click', this.onAllRowsRemove);
        this.submitBtn.addEventListener('click', this.onSubmit);
    }

    onRowAdd () {}
    onAllRowsToggle () {}
    onAllRowsRemove () {}
    onSubmit () {}
}
