import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Chart from '../components/chart';

const Year = ({ data }) => {
  return (
    <Layout>
      <Chart rankings={data.rankingsJson} />
    </Layout>
  );
};

export default Year;

export const query = graphql`
  query($year: Int!) {
    rankingsJson(year: { eq: $year }) {
      year
      data {
        week
        data {
          description
          top25 {
            rank
            team
            points
          }
        }
      }
    }
  }
`;
