require('dotenv').config();

const { CronJob } = require('cron');
const sendPotd = require('../services/send-potd');

const {
  CRON_TIMEZONE,
  CRON_INTERVAL,
} = process.env;

const job = new CronJob(
  CRON_INTERVAL,
  sendPotd,
  // `onComplete` callback
  null,
  // `start` option
  false,
  CRON_TIMEZONE,
);

job.start();
