import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEvent from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Template from './components/Template';

//import settings
import {
    amberA700, cyan700,
    pinkA200,
    grey100, grey300, grey400, grey500, grey900,
    white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

//import actions
import * as localeActions from './actions/locale.jsx';
import * as userActions from './actions/user.jsx';

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
        shadowColor: fullBlack
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

injectTapEvent();

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let props = Object.assign({}, this.props),
            language = props.locale.language,
            $window = $dw(window),
            userLanguage = $window.localStorage('language'),
            setLanguage = props.localeActions.setTranslation;

        if(!!userLanguage && language != userLanguage) {
            language = userLanguage;
            setLanguage(language);
        }

        $window.localStorage('language', language);
        
        return (
            <MuiThemeProvider
                muiTheme={muiTheme}
            >
                <Template
                    {...this.props}
                />
            </MuiThemeProvider>
        )
    }
}

function mapState2Props(state) {
    return {
        locale: state.locale,
        user: state.user,
        app: state.app
    }
}

function mapDispatch2Props(dispatch) {
    return {
        localeActions: bindActionCreators(localeActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch)
    }
}

export default connect(mapState2Props, mapDispatch2Props)(App);