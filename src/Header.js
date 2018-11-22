import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = {
  grow: {
    flexGrow: 1,
  },
  mainTitle: {
    marginLeft: 32,
  },
};

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: null
    }
  }
  componentDidMount() {
  }
  render() {
    const {classes, selectedTab, handleTabChange} = this.props
    return (
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h4" color="inherit" className={classes.mainTitle}>
              فارسی شكر است
            </Typography>
            <Tabs style={{direction: 'rtl', flex:1, justifyContent: 'center'}} value={selectedTab} onChange={handleTabChange}>
              <Tab label="واژه نامه" />
              <Tab label="پژوهش" />
              <Tab label="مقالات" />
            </Tabs>
          </Toolbar>
        </AppBar>
    )
  }
}
export default withStyles(styles)(Header)
