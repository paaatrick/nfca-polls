import React from 'react';

import { select, selectAll } from 'd3-selection';
import { scaleLinear, scalePoint } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { line } from 'd3-shape';
import { Typography } from '@material-ui/core';
import camelCase from 'lodash.camelcase';

import styles from './chart.module.css';

const handleMouseOver = function(d) {
  selectAll('.' + styles.bump)
    .sort(a => (a.team === d.team ? 1 : -1)) // pop this group to the top
    .classed(styles.disabled, true);
  select(this).classed(styles.disabled, false);
  select(this)
    .select('text')
    .attr('visibility', null)
    .attr('style', 'font-weight: bold;');
};

const handleMouseOut = function(d) {
  selectAll('.' + styles.bump).classed(styles.disabled, false);
  select(this)
    .select('text')
    .attr(
      'visibility',
      [...d.ranks].reverse().findIndex(i => i.value) > 0 ? 'hidden' : null
    )
    .attr('style', 'font-weight: normal;');
};

const getWeek = (description, index) => {
  if (description.search(/preseason/i) > -1) {
    return 'Preseason';
  }
  if (description.search(/final/i) > -1) {
    return 'Final';
  }
  return `Week ${index}`;
};

const toClassName = str => {
  const key = camelCase(str);
  const className = styles[key];
  if (!className) {
    console.warn('No style for ' + key);
    return '';
  }
  return className;
}

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  draw(polls) {
    const weeks = polls.map(poll => poll.data.description).map(getWeek);

    const spacing = {
      week: 50,
      rank: 30,
      tie: 15,
    };
    const lines = {
      width: spacing.week * (weeks.length - 1),
      height: spacing.rank * 25,
    };
    const labels = {
      width: 150,
      padding: 10,
    };
    const axis = {
      x: {
        padding: spacing.rank,
      },
      y: {
        padding: 0,
      },
    };
    const marker = {
      size: 8,
    };
    const margin = {
      top: 10,
      right: 0,
      bottom: 30,
      left: 25,
    };
    const element = {
      width:
        margin.left +
        lines.width +
        labels.padding +
        labels.width +
        margin.right,
      height: margin.top + lines.height + axis.x.padding + margin.bottom,
    };

    const svg = select(this.chartRef.current)
      .attr('width', element.width)
      .attr('height', element.height);

    const chart = svg
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const x = scalePoint()
      .domain(weeks)
      .range([0, lines.width]);

    const y = scaleLinear()
      .domain([1, 25])
      .range([0, lines.height]);

    const xAxis = axisBottom(x).tickSizeOuter(0);

    const yAxis = axisLeft(y)
      .ticks(25)
      .tickSize(-lines.width)
      .tickPadding(10);

    chart
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${lines.height + axis.x.padding})`)
      .call(xAxis);

    chart
      .append('g')
      .attr('class', 'y axis')
      .call(yAxis);

    const grouped = {};
    polls.forEach((poll, index) => {
      const week = getWeek(poll.data.description, index);
      poll.data.top25.forEach((row, idx, table) => {
        if (!grouped[row.team]) {
          grouped[row.team] = {
            team: row.team,
            ranks: weeks
              .map(week => ({ week, value: null }))
              .reduce((a, b) => {
                a[b.week] = b;
                return a;
              }, {}),
            points: weeks
              .map(week => ({ week, value: null }))
              .reduce((a, b) => {
                a[b.week] = b;
                return a;
              }, {}),
          };
        }
        const rank = row.rank || table[idx - 1].rank; // handle ties
        const points = row.points;
        grouped[row.team].ranks[week].value = rank;
        grouped[row.team].points[week].value = points;
      });
    });
    const data = Object.values(grouped);
    data.forEach(d => {
      d.ranks = Object.values(d.ranks);
      d.points = Object.values(d.points);
    });

    const bumpLine = line()
      .defined(d => d.value)
      .x(d => x(d.week))
      .y(d => y(d.value));

    const group = chart
      .selectAll(`g.${styles.bump}`)
      .data(data)
      .enter()
      .append('g')
      .attr('class', d => `${styles.bump} ${toClassName(d.team)}`)
      .on('mouseover', handleMouseOver)
      .on('mouseout', handleMouseOut);

    group
      .selectAll('path.vis')
      .data(d => [d.ranks])
      .enter()
      .append('path')
      .attr('class', 'vis')
      .attr('fill', 'none')
      .attr('stroke-width', 4)
      .attr('d', bumpLine);

    group
      .selectAll('path.invis')
      .data(d => [d.ranks])
      .enter()
      .append('path')
      .attr('class', 'invis')
      .attr('fill', 'none')
      .attr('style', 'opacity: 0;')
      .attr('stroke-width', 20)
      .attr('d', bumpLine);

    group
      .selectAll('circle')
      .data(d => d.ranks.filter(i => i.value))
      .enter()
      .append('circle')
      .attr('fill', 'white')
      .attr('cx', d => x(d.week))
      .attr('cy', d => y(d.value))
      .attr('r', marker.size / 2)
      .attr('stroke-width', 3);

    const getLatestRank = (d, idx) => {
      const chronoRanks = [...d.ranks].reverse();
      const latestIdx = chronoRanks.findIndex(i => i.value);
      return [{
        x: chronoRanks[latestIdx].week,
        y: chronoRanks[latestIdx].value,
        team: d.team,
        current: latestIdx === 0,
      }]
    };
    const latestRanks = data.map(getLatestRank);

    group
      .selectAll('text')
      .data(getLatestRank)
      .enter()
      .append('text')
      .attr('x', d => x(d.x) + labels.padding)
      .attr('y', d => {
        const ties = latestRanks.filter(other => other[0].x === d.x && other[0].y === d.y);
        const tieCount = ties.length;
        let offset = 0;
        if (tieCount > 1) {
          const tieRank = ties.findIndex(other => other[0].team === d.team);
          offset = (tieRank - ((tieCount - 1) / 2)) * spacing.tie;
        }
        return y(d.y) + offset;
      })
      .attr('alignment-baseline', 'middle')
      .attr('visibility', d =>  d.current ? null : 'hidden')
      .text(d => d.team);
  }

  componentDidMount() {
    this.draw(this.props.rankings.data);
  }

  componentDidUpdate(prevProps) {
    if (this.props.rankings.year !== prevProps.rankings.year) {
      this.draw(this.props.rankings.data);
    }
  }

  render() {
    return (
      <Typography
        variant='body2'
        align='center'
        component='div'
        style={{ overflowX: 'auto' }}
      >
        <svg ref={this.chartRef} />
      </Typography>
    );
  }
}

export default Chart;
