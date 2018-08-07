import {DICTIONARY} from '../../data/data';
import {SHADES_OF_BLUE} from '../../data/data';

import AbstractView from '../view';
import selectView from '../components/select';

export default class TableRowView extends AbstractView {
    constructor (data) {
        super();
        this._data = data;
    }

    get template () {
        return `<tr><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td><button type="button">Remove</button></td></tr>`;
    }

    bind () {
        const rm = this.element.querySelector('button');
        rm.onclick = this.onRemove;
    }

    onRemove () {}
}
