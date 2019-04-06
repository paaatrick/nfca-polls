import React from 'react';
import Typography from '@material-ui/core/Typography';
import Launch from '@material-ui/icons/Launch';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  footer: {
    flexShrink: 0,
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing.unit * 8,
    padding: theme.spacing.unit * 6,
  },
});

const Footer = ({ classes }) => (
  <footer className={classes.footer}>
    <Typography variant='h6' gutterBottom>
      About
    </Typography>
    <Typography variant='body2' component='div'>
      <p>
        Data is pulled from{' '}
        <a
          target='_blank'
          rel='noopener noreferrer'
          href='https://nfca.org/index.php?option=com_content&view=article&id=6250&Itemid=178'
        >
          USA Today/NFCA Coaches Division 1 polls <Launch fontSize='inherit' />
        </a>
        .
      </p>
      <p>
        Created by{' '}
        <a
          target='_blank'
          rel='noopener noreferrer'
          href='http://paaatrick.github.io/'
        >
          Patrick Kalita <Launch fontSize='inherit' />
        </a>
        .
      </p>
    </Typography>
  </footer>
);

export default withStyles(styles, { withTheme: true })(Footer);
