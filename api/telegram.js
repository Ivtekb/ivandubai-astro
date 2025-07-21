export default async function handler(request) {
  // Только POST запросы от Telegram
  if (request.method !== 'POST') {
    return new Response('Telegram Bot Webhook', { status: 200 });
  }

  try {
    const update = await request.json();
    
    if (update.message) {
      const chatId = update.message.chat.id;
      const text = update.message.text || '';
      const firstName = update.message.from.first_name || '';
      
      // Простая логика бота
      let responseText = '';
      let keyboard = null;
      
      if (text === '/start') {
        responseText = `🏠 Привет, ${firstName}!\n\nUAE Property Navigator\n\nВыберите язык:`;
        keyboard = {
          keyboard: [
            ['🇷🇺 Русский', '🇬🇧 English']
          ],
          resize_keyboard: true
        };
      } 
      else if (text.includes('🇷🇺') || text.includes('Русский')) {
        responseText = `🏠 <b>Недвижимость в ОАЭ</b>\n\nХочу услышать твой текущий фокус:`;
        keyboard = {
          keyboard: [
            ['🏠 Жить', '📈 Инвестировать'],
            ['🔄 Продать/Сдать', '🎯 Смешанный']
          ],
          resize_keyboard: true
        };
      }
      else if (text.includes('🇬🇧') || text.includes('English')) {
        responseText = `🏠 <b>UAE Real Estate</b>\n\nWhat's your current focus:`;
        keyboard = {
          keyboard: [
            ['🏠 Live', '📈 Invest'],
            ['🔄 Sell/Rent', '🎯 Mixed']
          ],
          resize_keyboard: true
        };
      }
      else if (text.includes('Жить') || text.includes('Live')) {
        responseText = `✅ Отлично! Фокус на жизни в ОАЭ.\n\nКаков ориентир по бюджету?\n(например: 3-4M AED)`;
      }
      else if (text.includes('Инвестировать') || text.includes('Invest')) {
        responseText = `📈 Инвестиционный фокус!\n\nКакая целевая доходность интересует?\n(например: 6-8% годовых)`;
      }
      else if (text.includes('M AED') || text.includes('млн') || /\d+/.test(text)) {
        responseText = `💰 Бюджет понятен!\n\nЧто важнее:`;
        keyboard = {
          keyboard: [
            ['🌊 Утро у воды', '🏙️ Доступ к центру'],
            ['⚖️ Баланс', '📞 Связаться с брокером']
          ],
          resize_keyboard: true
        };
      }
      else if (text.includes('Связаться') || text.includes('брокером') || text.includes('Contact')) {
        responseText = `📞 <b>Связь с брокером</b>\n\n✅ Ваш запрос отправлен!\n\nСвяжусь в течение дня для подбора вариантов.\n\n📱 Telegram: @ivandubai_signal_bot\n📞 WhatsApp: +971502778021`;
      }
      else if (text.includes('вода') || text.includes('water')) {
        responseText = `🌊 <b>Утро у воды - отличный выбор!</b>\n\nРекомендую локации:\n• Palm Jumeirah - частные пляжи\n• Dubai Marina - водный канал\n• JBR - прямо у моря\n\nПередать брокеру ваши предпочтения?`;
        keyboard = {
          keyboard: [
            ['📞 Да, связаться с брокером'],
            ['🏙️ Посмотреть другие варианты']
          ],
          resize_keyboard: true
        };
      }
      else {
        responseText = `Понял! Продолжаем подбор...\n\nИспользуйте /start для начала или напишите "Связаться с брокером"`;
      }
      
      if (responseText) {
        await sendMessage(chatId, responseText, keyboard);
      }
    }
    
    return new Response('OK', { status: 200 });
  } catch (error) {
    console.error('Bot error:', error);
    return new Response('Error', { status: 500 });
  }
}

async function sendMessage(chatId, text, replyMarkup = null) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  
  if (!botToken) {
    console.error('TELEGRAM_BOT_TOKEN not found');
    return;
  }
  
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  
  const payload = {
    chat_id: chatId,
    text: text,
    parse_mode: 'HTML'
  };
  
  if (replyMarkup) {
    payload.reply_markup = replyMarkup;
  }
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      console.error('Telegram API error:', await response.text());
    }
  } catch (error) {
    console.error('Send message error:', error);
  }
}

// Edge Runtime config
export const config = {
  runtime: 'edge'
};