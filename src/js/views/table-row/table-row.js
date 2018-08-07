import insertTemplate from '../../utilities/insert-template';
import TableRowFiew from './table-row-view';

export default class TableRow {
    constructor () {
        this._view = new TableRowFiew({loh: 'pidr'});
    }

    render (container) {
        this._view.onRemove = (e) => {
            console.dir(e.target);
            e.target.parentNode.parentNode.remove();
        };

        insertTemplate(this._view.element, container);
    }
}
