import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import { Location } from '@reach/router';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
});

const query = graphql`
  query {
    allRankingsJson(sort: { fields: year, order: DESC }) {
      edges {
        node {
          year
        }
      }
    }
  }
`;

class DrawerItems extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <StaticQuery
        query={query}
        render={data => {
          const years = data.allRankingsJson.edges.map(edge => edge.node.year);
          return (
            <Location>
              {({ location }) => {
                return (
                  <React.Fragment>
                    <div className={classes.toolbar} />
                    <Divider />
                    <List disablePadding>
                      {years.map((year, index) => (
                        <ListItem
                          button
                          key={year}
                          selected={!!location.pathname.match(`/${year}/?$`)}
                          component={props => (
                            <Link to={`/${year}`} {...props} />
                          )}
                        >
                          <ListItemText primary={year} />
                        </ListItem>
                      ))}
                    </List>
                  </React.Fragment>
                );
              }}
            </Location>
          );
        }}
      />
    );
  }
}

export default withStyles(styles, { withTheme: true })(DrawerItems);
