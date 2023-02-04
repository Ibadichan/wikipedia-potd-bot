const sendPotdToTelegram = require('./send-potd-to-telegram');
const parsePotd = require('../parsers/potd');

async function sendPotd() {
  const potd = await parsePotd();

  return Promise.all([
    sendPotdToTelegram(potd),
  ]);
}

module.exports = sendPotd;
