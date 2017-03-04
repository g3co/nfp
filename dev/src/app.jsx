import React from '../../node_modules/react/lib/React.js';
import ReactDOM from '../../node_modules/react-dom/lib/ReactDOM.js';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEvent from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import {
    amberA700, cyan700,
    pinkA200,
    grey100, grey300, grey400, grey500, grey900,
    white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

const muiTheme = getMuiTheme({
    spacing: spacing,
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: fade(grey900, 0.75),
        primary2Color: cyan700,
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
});

const GETFIGHT = (
    <div className="gf-logo">
        get<span>fight</span>
    </div>
);

class Template extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };
    }

    handleTouchTap(event) {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose() {
        this.setState({
            open: false,
        });
    };

    render() {
        return (
            <div>
                <AppBar className="gf-appbar" title={GETFIGHT}/>
                <RaisedButton
                    onTouchTap={this.handleTouchTap.bind(this)}
                    label="Click me"
                />
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose.bind(this)}
                >
                    <Menu>
                        <MenuItem primaryText="Refresh" />
                        <MenuItem primaryText="Help &amp; feedback" />
                        <MenuItem primaryText="Settings" />
                        <MenuItem primaryText="Sign out" />
                    </Menu>
                </Popover>
            </div>
        );
    }
}

injectTapEvent();

const App = React.createClass({
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Template/>
            </MuiThemeProvider>
        )
    }
});

const Appy = React.createClass({
    render() {
        let
            data = this.props.data,
            arry
            ;

        arry = !!data && data.length
            ? data.map((v, i) => {
                return <Item key={i} index={i} val={v}/>;
            })
            : <div>nothing</div>;

        console.log(arry);

        return (
            <div>
                {arry}
            </div>
        )
    }
});

let Item = React.createClass({
    render() {
        let data = this.props
            ;

        return data.val
            ? <div>Element: ${data.index} is <b>${data.val}</b></div>
            : <div>Empty</div>;
    }
});

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

/*

 */