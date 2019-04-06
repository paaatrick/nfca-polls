import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import DrawerItems from './drawerItems';

const drawerWidth = 240;
const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
});

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
    };
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ drawerOpen: !state.drawerOpen }));
  };

  render() {
    const { classes, theme, title } = this.props;
    const { drawerOpen } = this.state;

    return (
      <React.Fragment>
        <AppBar position='fixed' className={classes.appBar}>
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='Open drawer'
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' color='inherit' noWrap>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          <Hidden smUp>
            <Drawer
              container={this.props.container}
              variant='temporary'
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={drawerOpen}
              onClose={this.handleDrawerToggle}
              classes={{ paper: classes.drawerPaper }}
            >
              <DrawerItems />
            </Drawer>
          </Hidden>
          <Hidden xsDown>
            <Drawer
              classes={{ paper: classes.drawerPaper }}
              variant='permanent'
              open
            >
              <DrawerItems />
            </Drawer>
          </Hidden>
        </nav>
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Navigation);
