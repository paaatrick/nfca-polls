import { writeFile } from 'node:fs/promises';

import * as cheerio from 'cheerio';
import pThrottle from 'p-throttle';
import yargs from 'yargs';

const currentYear = new Date().getFullYear();
const argv = yargs(process.argv.slice(2))
  .default('startYear', currentYear)
  .default('endYear', currentYear).argv;

const throttle = pThrottle({
  limit: 1,
  interval: 2000,
});

const getPage = throttle((year, pollNumber) => {
  const url = `https://nfca.org/component/com_nfca/list,1/pdiv,div1/pnum,${pollNumber}/top25,1/year,${year}/`;
  console.log(url);
  return cheerio.fromURL(url);
});

const getPollNumbers = $ => {
  const $header = $('h2:contains("All Polls")');
  if ($header.length === 0) {
    throw new Error('Cannot find All Polls section');
  }
  return $header
    .nextUntil('h2')
    .map((_, el) => $(el).text())
    .toArray();
};

const getRankingData = $ => {
  const textAsInt = el => {
    const text = $(el).text();
    return text ? parseInt(text) : undefined;
  };

  return $.extract({
    description: 'h2',
    receivingVotes: {
      selector: '.list + h3 + p',
      value: el =>
        $(el)
          .text()
          .split(',')
          .map(item => item.trim().match(/((?:.(?!\())+) \((\d+)\)/))
          .filter(m => m != null)
          .map(matches => ({
            team: matches[1],
            points: parseInt(matches[2]),
          })),
    },
    top25: [
      {
        selector: '.list tr:has(td)',
        value: {
          rank: {
            selector: 'td:nth-child(1)',
            value: textAsInt,
          },
          team: {
            selector: 'td:nth-child(2)',
            value: el =>
              $(el)
                .text()
                .match(/(?:.(?!\())+/)[0],
          },
          record: 'td:nth-child(3)',
          points: {
            selector: 'td:nth-child(4)',
            value: textAsInt,
          },
        },
      },
    ],
  });
};

(async () => {
  for (let year = argv.startYear; year <= argv.endYear; year++) {
    const start = '1';
    let $ = await getPage(year, start);

    const allPollNumbers = getPollNumbers($);

    const yearData = [];
    for (const pollNumber of allPollNumbers) {
      if (pollNumber !== start) {
        $ = await getPage(year, pollNumber);
      }
      const data = getRankingData($);
      yearData.push({ week: parseInt(pollNumber), data });
    }

    await writeFile(
      `${import.meta.dirname}/../data/rankings/${year}.json`,
      JSON.stringify({ year, data: yearData })
    );
  }
})();
