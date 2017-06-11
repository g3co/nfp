import React from 'react';
import ReactDOM from 'react-dom';

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
    gfClassName
} from '../helper';

const {
    ActionBar,
    GetFight,
    Navigation,
    ModalBox,
    SplashScreen
} = ui;

const middleware = '//localhost:3000';

export default class Template extends React.Component {

    constructor(props) {
        super(props);

        this.modalShow = this.modalShow.bind(this);
        this.setTranslation = this.setTranslation.bind(this);

        $dw(document)
            .on('ready', function(e) {
                if(!!e == false || !!e.detail == false) {
                    return
                }

                var next = e.detail;

                if(!!Object.prototype.toString.call(next).match(/Function/i) == false) {
                    return
                }

                var _to = setTimeout(function() {

                    next();

                    clearTimeout(_to);
                }, 3000);
            });

        this.state = {
            open: false,
            logged: false
        };
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

    setTranslation(lang) {
        this.props.localeActions.setTranslation(lang)
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
                <span>{this.props.locale.translations.LABELS.LOG_IN}</span>
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
                <SplashScreen />
                <AppBar
                    className={gfClassName("appbar")}
                    style={{
                        position: "fixed",
                        padding: '0 16px'
                    }}
                    title={<GetFight
                        translations={this.props.locale.translations}
                        setTranslation={this.setTranslation}
                    />}
                    iconElementRight={this.state.logged ? <LoggedButton /> : <LoginButton />}
                    showMenuIconButton={false}
                    titleStyle={{
                        fontSize: 'inherit'
                    }}
                />
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