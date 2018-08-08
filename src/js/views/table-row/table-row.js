import TableRowFiew from './table-row-view';

export default class TableRow {
    constructor (rowData) {
        this._view = new TableRowFiew(rowData);
    }

    render (container) {
        this._view.onRemove = (e) => {
            e.target.parentNode.parentNode.remove();
            this._view.removeBtn.removeEventListener('click', this._view.onRemove);
        };

        container.appendChild(this._view.element);
    }
}
