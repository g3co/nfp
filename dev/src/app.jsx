import React from '../../node_modules/react/lib/React.js';
import ReactDOM from '../../node_modules/react-dom/lib/ReactDOM.js';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEvent from 'react-tap-event-plugin';

import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

export default class PopoverExampleSimple extends React.Component {

    constructor(props) {
        super(props);

        Object.assign(props, {
            prikol: []
        });

        console.log(props);

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

        if(this.props.prikol) {
            console.log('Vot eto prikol! %o', this.props.prikol);
        }
    };

    handleRequestClose() {
        this.setState({
            open: false,
        });
    };

    render() {
        return (
            <div prikol={[1,2]}>
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
            <MuiThemeProvider>
                <PopoverExampleSimple/>
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
    <Appy data={[1,2,3]}/>,
    document.getElementById('root')
);

/*

 */