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

    render(props) {

        props = {...this.props};

        let translations = props.locale.translations,
            user = props.user,
            account = user.account,
            setTranslation = props.localeActions.setTranslation;

        return (
            <div>
                <SplashScreen
                    translations={translations}
                />
                <AppBar
                    className={gfClassName("appbar")}
                    style={{
                        position: 'fixed',
                        padding: '0 16px'
                    }}
                    title={<GetFight
                        translations={translations}
                        setTranslation={setTranslation}
                    />}
                    iconElementRight={
                    !!account ?
                        <AccountButton
                            translations={translations}
                            user={user}
                        /> :
                        <LoginButton
                            translations={translations}
                            user={user}
                        />
                    }
                    showMenuIconButton={false}
                    titleStyle={{
                        fontSize: 'inherit'
                    }}
                />
                <ActionBar
                    translations={translations}
                />
                <Navigation
                    translations={translations}
                />
                <ModalBox
                    id={gfClassName("modalbox")}
                />
            </div>
        )
    }

    componentDidMount() {
        setTimeout(() => {

            //initMap();

            if('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    //initMap(position);

                    $dw(document).trigger('ready');

                    //google.maps.event.addDomListener(window, 'load', initMap);
                });
            } else {
                alert('To continue, please, get access to your geo location.')
            }
        }, 1000);
    }
}