import React from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';

import { gfClassName } from '../../helper';

import SocialMedia from '../SocialMedia';

export default class SplashScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: true,
            loading: true
        }
    }

    componentDidMount() {

        var splashScreen = findDOMNode(this),
            $splashScreen = $dw(splashScreen);

        $splashScreen
            .on('load', this.load.bind(this))
            .on('done', this.done.bind(this))
            .once('close', this.close.bind(this));
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
                open: false
            });

            clearTimeout(_to);
        }.bind(this), 200);
    }

    render(props) {

        props = Object.assign({}, this.props);

        return (
            <div
                className={[gfClassName('splash-screen'),
                    (this.state.open ? 'active' : 'inactive')
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
                        <span>{props.translations.SPLASH_SCREEN.AUTH_TITLE}</span>
                        <SocialMedia
                            className="vk"
                            getUserAccount={props.getUserAccount}
                        />
                        <SocialMedia
                            className="instagram"
                            getUserAccount={props.getUserAccount}
                        />
                    </section>
                </div>
                <ul>
                    {props.translations.HEADER.map((item, i) =>
                        <li key={i}>
                            <a role="link" href={item.route} tabIndex={i} key={i}>
                            {item.label}
                            </a>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}