import TableRowFiew from './table-row-view';

export default class TableRow {
    constructor (data) {
        const rowData = {...data};
        delete rowData.onRowRemove;

        this._view = new TableRowFiew(rowData);
        this.onRowRemove = data.onRowRemove;
    }

    render (container) {
        this._view.onRemove = (e) => {
            this.onRowRemove(e.target.dataset.index);
            e.target.parentNode.parentNode.remove();
            this._view.removeBtn.removeEventListener('click', this._view.onRemove);
        };

        container.appendChild(this._view.element);
    }
}
