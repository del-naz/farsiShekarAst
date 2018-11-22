import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import logo from './logo.svg';
import Home from './Home';
import {
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles'

const primaryColor = "#2a3f3f"
const primaryLightColor = '#735223'
const primaryDarkColor = '#422f15'
const secondaryColor = "#e07f5f"
const secondaryLightColor = '#F06292'
const secondaryDarkColor = '#880E4F'
const accent1 = '#e2cc8f'
const bg2 = '#969a97'
// Setup for custom theme.
const theme = createMuiTheme({
  direction: 'rtl',
  palette: {
    type: 'light',
    typography: {
      fontSize: 10,
      htmlFontSize: 10
    },
    primary: {
      light: primaryLightColor,
      main: primaryColor,
      dark: primaryDarkColor,
      contrastText: '#fff',
    },
    secondary: {
      light: secondaryLightColor,
      main: secondaryColor,
      dark: secondaryDarkColor,
      contrastText: '#fff',
    }
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        backgroundColor: primaryDarkColor,
        fontWeight: 400,
        fontSize: '.9em',
        maxWidth: 300,
      },
      tooltipPlacementLeft: {
        margin: '0 12px'
      },
      tooltipPlacementRight: {
        margin: '0 12px'
      },
      tooltipPlacementTop: {
        margin: '12px 0'
      },
      tooltipPlacementBottom: {
        margin: '12px 0'
      }
    },
    MuiSwitch: {
      switchBase: {
        height: 32
      }
    }
  }
})

class App extends Component {
  render() {
    const {classes} = this.props
    return (
      <MuiThemeProvider theme={theme}>
      <Home/>
      </MuiThemeProvider >
    )
  }
}
export default App
