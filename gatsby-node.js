const path = require(`path`);

exports.createPages = ({graphql, actions}) => {
  const { createPage } = actions
  return graphql(`
    query {
      allRankingsJson {
        edges {
          node {
            year
          }
        }
      }
    }
  `).then(result => {
    result.data.allRankingsJson.edges.forEach(({ node }) => {
      createPage({
        path: node.year.toString(),
        component: path.resolve('./src/templates/year.js'),
        context: {
          year: node.year
        }
      })
    });
  })
};
