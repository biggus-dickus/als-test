export default function renderTable () {
    return `
        <table class="order-table order-form__table js-table">
            <thead>
            <tr>
                <th class="order-table__color-th">Цвет</th>
                <th class="order-table__checkbox-th">
                    <input type="checkbox" class="checkbox-input visually-hidden js-master-checkbox" id="toggle-all" checked>
                    <label for="toggle-all" class="order-table__label" title="Отметить все">
                        <span class="visually-hidden">Отметить все</span>
                    </label>
                </th>
                <th class="order-table__tint-th">Оттенок</th>
                <th class="order-table__amount-th">Объем</th>
                <th class="order-table__unit-th">Упаковка</th>
                <th class="order-table__buttons-th">
                    <button type="button" class="remove-btn order-table__remove js-master-remove" title="Убрать все">
                    <span class="visually-hidden">Убрать все</span>
                    </button>
                </th>
            </tr>
            </thead>
            <tbody></tbody>
        </table>`;
}
