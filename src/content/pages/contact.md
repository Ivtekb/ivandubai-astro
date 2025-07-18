---
title: Связаться
seo:
  title: Контакты — брокер недвижимости в Дубае
  description: "Связаться со мной легко — WhatsApp, Telegram или форма сигнала — выбери свой ритм. Консультации по недвижимости в Дубае."
---

Благодарю за интерес — выбери канал, который звучит ближе к тебе.

---

<h3 style="font-size: 1.125rem; font-family: ui-serif, Georgia, Cambria, serif; font-weight: 600; margin-bottom: 0.75rem; line-height: 1.2;" class="sm:text-xl">
<a href="https://wa.me/971502778021" class="hover:underline">WhatsApp</a>
</h3>

---

<h3 style="font-size: 1.125rem; font-family: ui-serif, Georgia, Cambria, serif; font-weight: 600; margin-bottom: 0.75rem; line-height: 1.2;" class="sm:text-xl">
<a href="https://t.me/ivandubai_signal_bot" class="hover:underline">Telegram</a>
</h3>

---

<h3 style="font-size: 1.125rem; font-family: ui-serif, Georgia, Cambria, serif; font-weight: 600; margin-bottom: 0.75rem; line-height: 1.2;" class="sm:text-xl">Отправить сигнал</h3>

<form id="signalForm" action="/api/contact" method="POST" class="mt-4 space-y-4">
  <!-- Honeypot field (скрыто) -->
  <input type="text" name="company_name" class="hidden" tabindex="-1" autocomplete="off" />

  <div class="grid md:grid-cols-2 gap-4">
    <input type="text" name="name" placeholder="Имя" required class="border border-black p-3 w-full font-serif" />
    <input type="email" name="email" placeholder="Email" required class="border border-black p-3 w-full font-serif" />
  </div>

  <textarea name="message" placeholder="Сообщение" required class="border border-black p-3 w-full h-32 font-serif"></textarea>

  <input type="hidden" name="g-recaptcha-response" id="g-recaptcha-token" />

  <button type="submit" class="px-8 py-3 rounded-full border border-black font-serif italic text-lg hover:bg-black hover:text-white transition-colors">
    Отправить
  </button>
</form>

<!-- reCAPTCHA v3 -->
<script src="https://www.google.com/recaptcha/api.js?render=6LdLcYcrAAAAAO0moHni1UzeEH7mku-oJLbnArM7" defer></script>

<script is:inline>
  const siteKey = '6LdLcYcrAAAAAO0moHni1UzeEH7mku-oJLbnArM7';
  const form = document.getElementById('signalForm');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    grecaptcha.ready(function () {
      grecaptcha.execute(siteKey, { action: 'contact' }).then(function (token) {
        document.getElementById('g-recaptcha-token').value = token;
        form.submit();
      });
    });
  });
</script>