import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Dictionary from './Dictionary';
import Header from './Header';
const alphaBar = require('./data/alphaBar');


const styles = {
  root: {
    width: '100%',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  appBody: {
    flex: 1,
    minHeight: 400,
    padding: '2em'
  }
};
function TabContainer(props) {
  return (
    <div>
    <Typography component="div" variant='h4'>
      {props.title}
    </Typography>
    <Typography component="p">
      {props.children}
    </Typography>
    </div>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 0,
      ready: false
    }
  }

  componentDidMount() {
  }

  handleTabChange = (e, selectedTab) => {
      this.setState({selectedTab})
  }
  render() {
    const {classes} = this.props,
          {selectedTab} = this.state
    return (
        <div className={classes.root}>
        <Header selectedTab={this.state.selectedTab} handleTabChange={this.handleTabChange}/>
        <Paper className={classes.appBody}>
        {selectedTab === 0 && <Dictionary master={alphaBar}/>}
        {selectedTab === 1 && <TabContainer title={'پژوهش'}>Item Two</TabContainer>}
        {selectedTab === 2 && <TabContainer title={'مقالات'}>Item Three</TabContainer>}
        </Paper>
        </div>
    )
  }
}
export default withStyles(styles)(Home)
