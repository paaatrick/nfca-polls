const path = require(`path`);

exports.createPages = ({graphql, actions}) => {
  const { createPage, createRedirect } = actions
  return graphql(`
    query {
      allRankingsJson(sort: { fields: year, order: DESC }) {
        edges {
          node {
            year
          }
        }
      }
    }
  `).then(result => {
    result.data.allRankingsJson.edges.forEach(({ node }, idx) => {
      createPage({
        path: node.year.toString(),
        component: path.resolve('./src/templates/year.js'),
        context: {
          year: node.year
        }
      });
      if (idx === 0) {
        createRedirect({
          fromPath: '/',
          toPath: '/' + node.year.toString(),
          isPermanent: true,
          redirectInBrowser: true,
        });
      }
    });
  })
};
