const TelegramBot = require('node-telegram-bot-api');

const {
  TELEGRAM_TOKEN,
  TELEGRAM_CHAT_ID,
} = process.env;

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

async function sendPotdToTelegram(potd) {
  const {
    date,
    explanation,
    url,
  } = potd;

  await bot.sendPhoto(TELEGRAM_CHAT_ID, url, {
    caption: `<em>${date}</em>\n<b>${explanation}</b>`,
    parse_mode: 'HTML',
    disable_notification: true,
  });
}

module.exports = sendPotdToTelegram;
