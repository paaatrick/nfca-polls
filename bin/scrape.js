const fs = require('fs');
const Bottleneck = require('bottleneck');
const Xray = require('x-ray');

const x = Xray({
    filters: {
        split: value => value.split(', '),
        parse: value => (value
            .map(item => item.match(/((?:.(?!\())+) \((\d+)\)/))
            .map(matches => (matches && {
                team: matches[1],
                points: parseInt(matches[2])
            }))
        ),
        int: value => value && parseInt(value),
        name: value => value && value.match(/(?:.(?!\())+/)[0]
    }
});

const limiter = new Bottleneck({
    minTime: 500
});

const startYear = 2019;
const endYear = 2019;

const fetchWeek = (year, num) => {
  const url = `https://nfca.org/index.php?option=com_nfca&top25=1&list=1&year=${year}&pdiv=div1&pnum=${num}`;
  console.log(url);
  return x(url, {
    description: 'h2',
    top25: x('.list tr', [{
      rank: 'td:nth-child(1) | int',
      team: 'td:nth-child(2) | name',
      record: 'td:nth-child(3)',
      points: 'td:nth-child(4) | int'
    }]),
    receivingVotes: '.list + h3 + p | split | parse',
  }).then(i => i);
}

const loop = async () => {
  for (let year = startYear; year <= endYear; year++) {
    let week = 1;
    const yearData = []
    while (true) {
      const data = await limiter.schedule(() => fetchWeek(year, week));
      if (!data.top25.length) {
        break;
      }
      yearData.push({ week, data });
      week += 1;
    }
    fs.writeFileSync(
      `${__dirname}/../data/rankings/${year}.json`,
      JSON.stringify({ year, data: yearData })
    )
  }
}

loop();
