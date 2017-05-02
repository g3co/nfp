import React from '../../node_modules/react/lib/React.js';
import ReactDOM from '../../node_modules/react-dom/lib/ReactDOM.js';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEvent from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


import {
    amberA700, cyan700,
    pinkA200,
    grey100, grey300, grey400, grey500, grey900,
    white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

import Template from './components/Template';

const
    brandColor1 = '#e43d35',
    brandColor2 = '#333333'
    ;

const muiTheme = getMuiTheme({
    spacing: spacing,
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: fade(grey900, 0.75),
        primary2Color: brandColor1,
        primary3Color: grey400,
        accent1Color: pinkA200,
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        disabledColor: fade(darkBlack, 0.3),
        pickerHeaderColor: amberA700,
        clockCircleColor: fade(darkBlack, 0.07),
        shadowColor: fullBlack,
    },
    slider: {
        selectionColor: brandColor1
    },
    checkbox: {
        checkedColor: brandColor1
    },
    radiobutton: {
        checkedColor: brandColor1
    }
});

//import GetFight

//import Actionbar

//import Navigation

injectTapEvent();

const App = React.createClass({
    render() {
        return (
            <MuiThemeProvider
                muiTheme={muiTheme}
            >
                <Template />
            </MuiThemeProvider>
        )
    }
});


ReactDOM.render(
    <App />,
    document.getElementById('root')
);