import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import HeadTags from './headTags';
import Navigation from './navigation';
import Footer from './footer';

const theme = createMuiTheme({
  palette: {
    primary: teal,
  },
  typography: {
    useNextVariants: true,
  },
});

const styles = theme => ({
  root: {
    display: 'flex',
  },
  main: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    maxWidth: '100%',
    [theme.breakpoints.up('sm')]: {
      maxWidth: 'calc(100% - 240px)',
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
});

const query = graphql`
  query HeadingQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

const Layout = ({ children, classes }) => (
  <StaticQuery
    query={query}
    render={data => {
      const title = data.site.siteMetadata.title;
      return (
        <MuiThemeProvider theme={theme}>
          <HeadTags title={title} />
          <CssBaseline />
          <div className={classes.root}>
            <Navigation title={title} />
            <main className={classes.main}>
              <div className={classes.toolbar} />
              <div className={classes.content}>{children}</div>
              <Footer />
            </main>
          </div>
        </MuiThemeProvider>
      );
    }}
  />
);

export default withStyles(styles, { withTheme: true })(Layout);
