import appState from '../../state/state';
import TableRowFiew from './table-row-view';

export default class TableRow {
    constructor (data) {
        const rowData = {...data};
        delete rowData.onRowRemove;
        delete rowData.updateIndexes;
        delete rowData.onRowToggle;

        this._view = new TableRowFiew(rowData);

        this._onRowRemove = data.onRowRemove;
        this._onRowToggle = data.onRowToggle;
        this._updateIndexes = data.updateIndexes;
    }

    render (container) {
        this._view.onRemove = (e) => {
            this._onRowRemove(e.target.dataset.index);

            this._view.removeBtn.removeEventListener('click', this._view.onRemove);
            this._view.checkbox.removeEventListener('change', this._view.onRowToggle);
            this._view.select.removeEventListener('change', this._view.onSelectChange);
            this._view.input.removeEventListener('change', this._view.onInputChange);

            e.target.parentNode.parentNode.remove();
            this._updateIndexes(e.target.dataset.index);
        };

        this._view.onRowToggle = (e) => this._onRowToggle(e.target.dataset.index, e.target.checked);
        this._view.onSelectChange = (e) => appState.changeValue(e.target.dataset.index, 'tint', e.target.value);
        this._view.onInputChange = (e) => appState.changeValue(e.target.dataset.index, 'amount', +e.target.value);

        container.appendChild(this._view.element);
    }
}
