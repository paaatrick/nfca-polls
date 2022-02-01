const fs = require('fs');
const Bottleneck = require('bottleneck');
const Xray = require('x-ray');

const currentYear = (new Date()).getFullYear()
const argv = require('yargs/yargs')(process.argv.slice(2))
  .default('startYear', currentYear)
  .default('endYear', currentYear)
  .argv;

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

const fetchWeek = (year, num) => {
  const url = `https://nfca.org/component/com_nfca/list,1/pdiv,div1/pnum,${num}/top25,1/year,${year}/`;
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
  for (let year = argv.startYear; year <= argv.endYear; year++) {
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
