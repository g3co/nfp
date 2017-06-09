import React, {PropTypes} from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';

import AppBar from 'material-ui/AppBar';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import FontIcon from 'material-ui/FontIcon';
import Slider from 'material-ui/Slider';

import {
    ui,
    colors,
    gfClassName
} from '../helper';

const {
    ActionBar,
    GetFight,
    Navigation,
    ModalBox
} = ui;

let translations;

const middleware = '//localhost:3000';

export default class Template extends React.Component {

    constructor(props) {
        super(props);

        translations = props.locale.translations;

        this.modalShow = this.modalShow.bind(this);
        this.switchTranslation = this.switchTranslation.bind(this);

        this.state = {
            open: false,
            logged: false
        };
    }

    handleTouchTap(event) {
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget
        });
    };

    handleRequestClose() {
        this.setState({
            open: false
        });
    };

    toggleClassName(e, _className) {
        let
            el = e.target,
            className = el.className
            ;

        if(!!className && !!~className.indexOf(_className)) {
            el.className = className.replace(_className, '')
        } else {
            el.className += ' '+ _className
        }
    }

    modalShow() {
        $dw('#'+ gfClassName("modalbox"))
            .once('ready', function(e) {
                console.log('ready at now...');
            })
            .on('load', function(e) {
                var $this = $dw(this),
                    $social = $dw('.gf-social-media');

                console.log('Loaded1!!');
            })
            .once('error', function (e) {
                console.log('Error %o', e);
            })
            .trigger('show', {route: middleware.concat('/auth')});
    }

    switchTranslation(e) {
        console.log(e.target);
        this.props.localeActions.setTranslation('en')
    }

    render(props) {

        const LoginButton = (props) => (
            <button
                {...props}
                className={gfClassName("action__login")}
                type="button"
                onClick={this.modalShow}
            >
                <FontIcon
                    className="material-icons"
                    color="#fff"
                    style={{
                        fontSize: '2em'
                    }}
                >person</FontIcon>
                <span>{translations.LABELS.LOG_IN}</span>
            </button>
        );

        const LoggedButton = (props) => (
            <IconMenu
                {...props}
                iconButtonElement={
                    <FontIcon>person</FontIcon>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
                <MenuItem primaryText="Refresh" />
                <MenuItem primaryText="Help" />
                <MenuItem primaryText="Sign out" />
            </IconMenu>
        );

        return (
            <div
                {...props}
            >
                <AppBar
                    className={gfClassName("appbar")}
                    style={{
                        position: "fixed",
                        padding: '0 16px'
                    }}
                    title={<GetFight
                        translations={this.props.locale.translations}
                    />}
                    iconElementRight={this.state.logged ? <LoggedButton /> : <LoginButton />}
                    showMenuIconButton={true}
                    onLeftIconButtonTouchTap={this.handleTouchTap.bind(this)}
                    titleStyle={{
                        fontSize: 'inherit'
                    }}
                />
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose.bind(this)}
                >
                    <Menu>
                        <MenuItem
                            primaryText="Choose English"
                            onClick={this.switchTranslation}
                        />
                        <MenuItem
                            primaryText="Choose Russian"
                            onClick={this.switchTranslation}
                        />
                        <MenuItem primaryText="Sign out" />
                    </Menu>
                </Popover>
                <ActionBar
                    translations={this.props.locale.translations}
                />
                <Navigation
                    translations={this.props.locale.translations}
                />
                <ModalBox
                    id={gfClassName("modalbox")}
                />
            </div>
        );
    }

    componentDidMount() {
        setTimeout(() => {

            initMap();

            if('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    initMap(position);

                    //google.maps.event.addDomListener(window, 'load', initMap);
                });
            } else {
                alert('To continue, please, get access to your geo location.')
            }
        }, 1000);
    }
}