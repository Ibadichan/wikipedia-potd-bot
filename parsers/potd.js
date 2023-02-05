const dayjs = require('dayjs');
const jsdom = require('jsdom');
const RSSParser = require('rss-parser');

const parser = new RSSParser();

const { JSDOM } = jsdom;

const RSS_URL = 'https://commons.wikimedia.org/w/api.php?action=featuredfeed&feed=potd&feedformat=rss&language=ru';

function getImageUrl(node) {
  const { srcset } = node;

  let biggestImage = '';
  let highestPixelDensity = 1;

  srcset.split(',').forEach((descriptor) => {
    const [url, pixelDensity] = descriptor.trim().split(' ');

    if (parseFloat(pixelDensity) > highestPixelDensity) {
      biggestImage = url;
      highestPixelDensity = parseFloat(pixelDensity);
    }
  });

  return biggestImage;
}

async function parsePotd() {
  const feed = await parser.parseURL(RSS_URL);

  const lastFeed = feed.items[feed.items.length - 1];

  const dom = new JSDOM(lastFeed.content);

  const { document } = dom.window;

  const date = dayjs().format('YYYY.MM.DD');
  const explanation = document.querySelector('.description').innerHTML;
  const url = getImageUrl(document.querySelector('img'));

  const potd = {
    date,
    explanation,
    url,
  };

  return potd;
}

module.exports = parsePotd;
