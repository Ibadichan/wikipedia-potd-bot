require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

const isProduction = process.env.NODE_ENV === 'production';

async function runApplication() {
  const app = express();

  const port = process.env.PORT || 3000;
  const host = process.env.LISTEN_HOST || '127.0.0.1';

  app.disable('x-powered-by');
  app.set('trust proxy', 'loopback');

  app.use(morgan(isProduction ? 'combined' : 'dev'));

  app.use(express.urlencoded({
    extended: true,
  }));

  app.get('/', (req, res) => {
    res.send('Hello from POTD Bot!');
  });

  app.post('/send-potd', async (req, res) => {
    try {
      // await sendPotd();

      res.json({
        code: 'OK',
        message: 'POTD was successfully sent.',
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);

      res.status(400);

      res.json({
        code: 'ERROR',
        message: 'An error occured while sending POTD.',
      });
    }
  });

  app.listen({ port, host }, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is listening on ${host}:${port}`);
  });
}

runApplication();
