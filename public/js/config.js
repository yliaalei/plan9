// js/config.js
window.APP_CONFIG = {
  // === ОБЩЕЕ ===
  APP_URL: 'https://your-app.example.com',  // Куда вести пользователя после успешной оплаты
  SUCCESS_REDIRECT_DELAY_MS: 1200,          // Задержка перед редиректом со страницы success.html

  // === РЕЖИМ 1: без бэкенда, есть готовая платежная ссылка Т-Банк ===
  USE_STATIC_PAYMENT_LINK: false,           // true — если у вас уже есть готовая ссылка на оплату
  PAYMENT_LINK: '',                         // Вставьте сюда ссылку оплаты (PaymentURL) от Т-Банк

  // === РЕЖИМ 2: с бэкендом через Integration.js (рекомендуется) ===
  USE_TBANK_WIDGET: true,                   // Показывать виджет T‑Bank (кнопка T‑Pay/SBP и т.д.)
  TERMINAL_KEY: 'YOUR_TERMINAL_KEY',        // Публичный terminalKey из ЛК Т‑Бизнес
  BACKEND_INIT_URL: '',                     // URL вашего сервера: POST -> { paymentUrl: '...' }
  WIDGET_TYPES: ['tpay']                    // Какие способы отобразить: 'tpay', 'sbp', 'mirpay', 'sberpay', 'bnpl'
};
