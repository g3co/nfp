import React from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import * as userActions from '../../../actions/user.jsx';

import { gfClassName } from '../../helper';

import SocialMedia from '../SocialMedia';

class SplashScreen extends React.Component {

    constructor(props) {
        super(props);

        this.getUserAccount = this.getUserAccount.bind(this);

        this.state = {
            open: !!this.props.user.account == false,
            loading: true
        }
    }

    componentDidMount() {

        var splashScreen = findDOMNode(this),
            $splashScreen = $dw(splashScreen);

        this.getUserAccount();

        $splashScreen
            .on('load', this.load.bind(this))
            .on('done', this.done.bind(this))
            .on('close', this.close.bind(this));
    }

    load() {
        this.setState({
            loading: true
        });
    }

    done() {
        this.setState({
            loading: false
        });
    }
    
    close() {
        let $splash = $dw(findDOMNode(this)),
            _to;

        $splash
            .removeClass('active');

        _to = setTimeout(function() {

            this.setState({
                open: false,
                loading: false
            });

            clearTimeout(_to);
        }.bind(this), 200);
    }

    getUserAccount() {
        var props = {...this.props},
            account = props.user.account,
            setUserAccount = props.userActions.setUserAccount,
            $splashScreen = $dw(`.${gfClassName("splash-screen")}`);

        if(!!account) {
            $splashScreen
                .trigger('close');

            return
        }

        $splashScreen
            .trigger('load');

        return $splashScreen
            .request('/api/v1/account')
            .then(function(res) {
                $splashScreen
                    .trigger('close');

                setUserAccount(res);
            })
            .catch(function (e) {
                $splashScreen
                    .trigger('done');
            })
    }

    render(props) {

        props = {...this.props};

        let translations = props.translations,
            account = props.user.account,
            getUserAccount = this.getUserAccount;

        return (
            <div
                className={[gfClassName('splash-screen'),
                    (this.state.open || !!account == false ? 'active' : 'inactive')
                ].join(' ')}
            >
                <h2>nfp
                    <small>net fight promotion</small>
                </h2>
                <div
                    className={gfClassName('splash-screen__auth-block')}
                >
                    <div
                        className={['loader--radial',
                            (this.state.loading ? '' : 'hidden')
                        ].join(' ')}
                    ></div>
                    <section
                        className={(this.state.loading ? '' : 'active')}
                    >
                        <span>{translations.SPLASH_SCREEN.AUTH_TITLE}</span>
                        <SocialMedia
                            className="vk"
                            getUserAccount={getUserAccount}
                        />
                        <SocialMedia
                            className="instagram"
                            getUserAccount={getUserAccount}
                        />
                    </section>
                </div>
                <ul>
                    {translations.HEADER.map((item, i) =>
                        <li>
                            <a role="link" href={item.route} tabIndex={i}>
                            {item.label}
                            </a>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default connect(state => {return {
    user: state.user
}}, dispatch => {return {
    userActions: bindActionCreators(userActions, dispatch)
}})(SplashScreen);