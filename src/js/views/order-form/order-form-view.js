import AbstractView from '../view';

import buttonView from '../components/button';
import sidebarView from '../components/sidebar';
import tableView from '../components/table';
import titleView from '../components/title';

export default class OrderFormView extends AbstractView {
    get template () {
        return `
        <form action="?" method="get" class="order-form">
            <section class="order-form__body">
                ${titleView(4)}
                ${tableView([42])}
                ${buttonView()}
            </section>
            ${sidebarView()}
        </form>`;
    }

    bind () {
        const btn = this.element.querySelector('.order-form__btn');
        btn.addEventListener('click', this.onClick);
    }

    onClick () {}
}
