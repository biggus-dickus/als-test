export default function renderSidebar () {
    return `
        <aside class="order-form__sidebar">
            <ul class="reset-list order-form__list">
                <li class="order-form__list-item">
                    <a class="order-form__list-link order-form__list-link--current">Состав заказа</a>
                </li>
                <li class="order-form__list-item">
                    <a href="#" class="order-form__list-link">Комментарий</a>
                </li>
                <li class="order-form__list-item">
                    <a href="#" class="order-form__list-link">Контактное лицо</a>
                </li>
            </ul>

            <button type="submit" class="btn order-form__btn">Отправить</button>
        </aside>`;
}
