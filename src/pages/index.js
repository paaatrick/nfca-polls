import React from 'react';
import { graphql } from 'gatsby';
import { Redirect } from '@reach/router';

const Index = ({ data }) => (
  <Redirect to={`${data.allRankingsJson.edges[0].node.year}`} noThrow />
);

export default Index;

export const query = graphql`
  {
    allRankingsJson(sort: { fields: year, order: DESC }, limit: 1) {
      edges {
        node {
          year
        }
      }
    }
  }
`;
