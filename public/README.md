# Приветственная страница оплаты (Т‑Банк) → доступ к приложению

## Вариант A: Без бэкенда (быстро)
1) В ЛК Т‑Бизнес создайте **платёжную ссылку** (PaymentURL) для нужного продукта/суммы.
2) В `js/config.js`:
   - `USE_STATIC_PAYMENT_LINK: true`
   - `PAYMENT_LINK: 'https://securepayments.tinkoff.ru/...'`
   - `USE_TBANK_WIDGET: false`
   - `APP_URL: 'https://your-app.example.com'`
3) Залейте на GitHub Pages.

## Вариант B: С бэкендом (рекомендуется)
1) Подключите эквайринг, получите **TerminalKey** и пароль терминала.
2) Поднимите сервер/серверлес-ручку `POST /api/create-payment`, которая вызывает
   **`/v2/Init`** и возвращает `{ paymentUrl }`. В Init обязательно:
   - `DATA.connection_type = 'Widget'`
   - `SuccessURL: 'https://<user>.github.io/<repo>/success.html?orderId={OrderId}'`
   - `FailURL: 'https://<user>.github.io/<repo>/fail.html'`
3) Включите **уведомления об операциях** (NotificationURL) и проверяйте статус платежа.
4) В `js/config.js`:
   - `USE_TBANK_WIDGET: true`
   - `TERMINAL_KEY: '...'`
   - `BACKEND_INIT_URL: 'https://...'`
   - `WIDGET_TYPES: ['tpay']` (или другие)
5) Залейте на GitHub Pages.

> Документация: Integration.js (подключение и конфиг), «Кнопки быстрой оплаты», метод `/v2/Init`, `SuccessURL/FailURL`, уведомления об операциях. Ссылки в основном README ответа.
