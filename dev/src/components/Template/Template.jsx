import React from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';

import AppBar from 'material-ui/AppBar';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';

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
    SplashScreen,
    AccountButton,
    LoginButton
} = ui;

export default class Template extends React.Component {

    constructor(props) {
        super(props);

        this.modalShow = this.modalShow.bind(this);
        this.setTranslation = this.setTranslation.bind(this);
        this.getUserAccount = this.getUserAccount.bind(this);

        $dw(document)
            .on('ready', this.getUserAccount);

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
            .trigger('show', {route: '/auth'});
    }

    setTranslation(lang) {
        this.props.localeActions.setTranslation(lang)
    }

    getUserAccount() {
        var $template = $dw(findDOMNode(this)),
            $splashScreen = $dw('.'+ gfClassName('splash-screen'));

        if(!!this.props.user.account) {
            $splashScreen
                .trigger('close');

            return
        }

        $splashScreen
            .trigger('load');

        return $template
            .request('/api/v1/account')
            .then(function(res) {
                $splashScreen
                    .trigger('close');

                this.props.userActions.setUserAccount(res);
            }.bind(this))
            .catch(function (e) {
                $splashScreen
                    .trigger('done');
            })
    }

    render(props) {

        props = {...this.props};

        return (
            <div>
                <SplashScreen
                    translations={props.locale.translations}
                    getUserAccount={this.getUserAccount}
                />
                <AppBar
                    className={gfClassName("appbar")}
                    style={{
                        position: 'fixed',
                        padding: '0 16px'
                    }}
                    title={<GetFight
                        translations={props.locale.translations}
                        setTranslation={this.setTranslation}
                    />}
                    iconElementRight={
                    !!props.user.account ?
                        <AccountButton
                            translations={props.locale.translations}
                            user={props.user}
                        /> :
                        <LoginButton
                            translations={props.locale.translations}
                            user={props.user}
                        />
                    }
                    showMenuIconButton={false}
                    titleStyle={{
                        fontSize: 'inherit'
                    }}
                />
                <ActionBar
                    translations={props.locale.translations}
                />
                <Navigation
                    translations={props.locale.translations}
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

                    $dw(document).trigger('ready');

                    //google.maps.event.addDomListener(window, 'load', initMap);
                });
            } else {
                alert('To continue, please, get access to your geo location.')
            }
        }, 1000);
    }
}