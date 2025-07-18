---
title: Связаться
seo:
  title: Контакты — брокер недвижимости в Дубае
  description: "Связаться со мной легко — WhatsApp, Telegram или форма сигнала — выбери свой ритм. Консультации по недвижимости в Дубае."
---

Благодарю за интерес — выбери канал, который звучит ближе к тебе.

<div class="flex flex-col sm:flex-row gap-4 justify-center items-center my-8">
  <a 
    href="https://wa.me/971502778021"
    target="_blank"
    class="px-8 py-3 rounded-full border border-black font-serif italic text-lg hover:bg-black hover:text-white transition-colors no-underline"
    style="color: inherit;"
  >
    WhatsApp
  </a>
  <a 
    href="https://t.me/ivandubai_signal_bot"
    target="_blank"
    class="px-8 py-3 rounded-full border border-black font-serif italic text-lg hover:bg-black hover:text-white transition-colors no-underline"
    style="color: inherit;"
  >
    Telegram
  </a>
</div>

---

<h3 style="font-size: 1.125rem; font-family: ui-serif, Georgia, Cambria, serif; font-weight: 600; margin-bottom: 0.75rem; line-height: 1.2;" class="sm:text-xl">Отправить сигнал</h3>

<form action="https://formspree.io/f/movlvnnr" method="POST" class="mt-4 space-y-4">
  <input type="hidden" name="_next" value="https://ivandubai.xyz/contact?success=true" />
  <input type="hidden" name="_subject" value="🏠 Новая заявка с ivandubai.xyz" />
  <input type="text" name="company_name" class="hidden" tabindex="-1" autocomplete="off" />

  <div class="grid md:grid-cols-2 gap-4">
    <input type="text" name="name" placeholder="Имя" required class="border border-black p-3 w-full font-serif" />
    <input type="email" name="email" placeholder="Email" required class="border border-black p-3 w-full font-serif" />
  </div>

  <textarea name="message" placeholder="Сообщение" required class="border border-black p-3 w-full h-32 font-serif"></textarea>

  <button type="submit" class="px-8 py-3 rounded-full border border-black font-serif italic text-lg hover:bg-black hover:text-white transition-colors">
    Отправить
  </button>
</form>

<script>
  if (window.location.search.includes('success=true')) {
    document.querySelector('form').innerHTML = '<div class="text-center py-8"><h3 class="text-2xl font-serif mb-4">Спасибо!</h3><p>Ваше сообщение отправлено. Отвечу в течение дня.</p></div>';
  }
</script>