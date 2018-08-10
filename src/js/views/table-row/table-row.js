import TableRowFiew from './table-row-view';

export default class TableRow {
    constructor (data) {
        const rowData = {...data};
        delete rowData.onRowRemove;
        delete rowData.updateIndexes;

        this._view = new TableRowFiew(rowData);

        this._onRowRemove = data.onRowRemove;
        this._updateIndexes = data.updateIndexes;
    }

    render (container) {
        this._view.onRemove = (e) => {
            this._onRowRemove(e.target.dataset.index);

            e.target.parentNode.parentNode.remove();
            this._view.removeBtn.removeEventListener('click', this._view.onRemove);

            this._updateIndexes(e.target.dataset.index);
        };

        container.appendChild(this._view.element);
    }
}
