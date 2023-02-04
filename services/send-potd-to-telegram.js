const TelegramBot = require('node-telegram-bot-api');

const {
  TELEGRAM_TOKEN,
  TELEGRAM_CHAT_ID,
} = process.env;

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

async function sendPotdToTelegram(potd) {
  const {
    copyright,
    date,
    explanation,
    title,
    url,
  } = potd;

  const caption = `${title} (${date})\n${copyright}`;

  await bot.sendPhoto(TELEGRAM_CHAT_ID, url, {
    caption,
    parse_mode: 'HTML',
    disable_notification: true,
  });

  await bot.sendMessage(TELEGRAM_CHAT_ID, explanation, {
    parse_mode: 'HTML',
    disable_notification: true,
  });
}

module.exports = sendPotdToTelegram;
