const jsdom = require('jsdom');

const { JSDOM } = jsdom;

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  return new Date(dateString).toLocaleDateString(undefined, options);
}

function formatCopyright(html) {
  const label = html.split('credit:')[0].trim();
  const value = html.split('credit:')[1].trim();

  return `<b>${label} credit:</b> ${value}`;
}

async function parsePotd() {
  const dom = await JSDOM.fromURL('https://en.wikipedia.org/wiki/Wikipedia:Picture_of_the_day');

  const { document } = dom.window;

  const links = document.querySelectorAll('#mp-tfp a');

  // Transform relative urls to absolute
  links.forEach((link) => link.setAttribute('href', link.href));

  const date = new Date();
  const copyright = document.querySelector('#mp-tfp small').innerHTML;
  const explanation = document.querySelector('#mp-tfp p:first-child').innerHTML.trim();
  const imgNode = document.querySelector('#mp-tfp img');

  const url = imgNode.src;
  const title = imgNode.alt;

  const potd = {
    copyright: formatCopyright(copyright),
    date: `<em>${formatDate(date)}</em>`,
    explanation,
    title: `<b>${title}</b>`,
    url,
  };

  return potd;
}

module.exports = parsePotd;
