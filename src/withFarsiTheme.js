import React from 'react'
import { create } from 'jss'
import JssProvider from 'react-jss/lib/JssProvider'
import rtl from 'jss-rtl'
import {
  MuiThemeProvider,
  createMuiTheme,
  jssPreset,
} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
const primaryColor = "#3F395A"
const primaryLightColor = '#675d93'
const primaryDarkColor = '#302c44'
const secondaryColor = "#D81B60"
const secondaryLightColor = '#F06292'
const secondaryDarkColor = '#880E4F'

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

const jss = create(jssPreset())

function withFarsiTheme(Component) {
  function withFarsiTheme(props) {
    // JssProvider allows customizing the JSS styling solution.
    return (
      <JssProvider jss={jss} classNamePrefix="Farsi-">
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...props} />
        </MuiThemeProvider>
      </JssProvider>
    )
  }

  return withFarsiTheme
}

export default withFarsiTheme
