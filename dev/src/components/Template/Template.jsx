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
    NetFight,
    Navigation,
    ModalBox,
    SplashScreen,
    AccountButton,
    LoginButton,
    Instant,
    ProgressBar,
    Notification,
    TrainingBox
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
            lang = props.locale.language,
            user = props.user,
            app = props.app,
            account = user.account,
            trainingMode = app.trainingMode,
            mapMode = app.mapMode,
            setTranslation = props.localeActions.setTranslation;

        return (
            <div>
                <SplashScreen
                    translations={translations}
                />
                <ProgressBar />
                <Notification />
                <TrainingBox />
                <AppBar
                    className={gfClassName("appbar")}
                    style={{
                    position: 'fixed',
                    padding: '0 16px'
                }}
                    title={<NetFight
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
                        />}
                    showMenuIconButton={false}
                    titleStyle={{
                        fontSize: 'inherit'
                    }}
                />
                {!!mapMode == false &&
                    <ActionBar
                        translations={translations}
                    />
                }
                {!!account &&
                    <Navigation />
                }
                <Instant />
                <ModalBox
                    id={gfClassName("modalbox")}
                    lang={lang}
                />
            </div>
        )
    }
}