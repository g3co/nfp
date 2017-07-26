import React from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { setUserAccount } from '../../../actions/user.jsx';

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

    modalShow(route) {
        $dw('#'+ gfClassName("modalbox"))
            .once('ready', function(e) {
                console.log('ready at now...');
            })
            .on('load', function(e) {

                console.log('Loaded1!!');
            })
            .once('error', function (e) {
                console.log('Error %o', e);
            })
            .trigger('show', {route: route});
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
            setUserAccount = props.setUserAccount,
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

        $dw(window).lazy();

        let translations = props.translations,
            account = props.user.account,
            getUserAccount = this.getUserAccount,
            modalShow = this.modalShow,
            open = this.state.open,
            loading = this.state.loading,
            previewLinksList = function() {
                return translations.HEADER.map((item, i) =>
                    <li
                        key={i}
                    >
                        <a
                            role="link"
                            href={item.route}
                            tabIndex={i}
                            onClick={function(e) {
                                e.preventDefault();

                                modalShow(item.route);

                                return false
                            }}
                        >
                            {item.label}
                        </a>
                    </li>
                )
            };

        return (
            <div
                className={[
                    gfClassName("splash-screen"),
                    (open || !!account == false ? "active" : "inactive")
                ].join(" ")}
            >
                <img data-src="https://c1.staticflickr.com/2/1603/24911097385_e6d1ccb453_z.jpg" />
                <h2>nfp
                    <small>net fight promotion</small>
                </h2>
                <div
                    className={gfClassName("splash-screen__auth-block")}
                >
                    <div
                        className={[
                            "loader--radial",
                            (loading ? "" : "hidden")
                        ].join(" ")}
                    ></div>
                    <section
                        className={(loading ? "" : "active")}
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
                        <SocialMedia
                            className="fb"
                            getUserAccount={getUserAccount}
                        />
                    </section>
                </div>
                <ul>
                    {previewLinksList()}
                </ul>
            </div>
        )
    }
}

export default connect(state => {return {
    user: state.user
}}, dispatch => {return {
    setUserAccount: bindActionCreators(setUserAccount, dispatch)
}})(SplashScreen);