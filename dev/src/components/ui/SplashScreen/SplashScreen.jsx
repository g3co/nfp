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
        $dw(document)
            .trigger('ready', this.hide.bind(this));
    }

    hide() {
        let $splash = $dw(findDOMNode(this)),
            _to;

        this.setState({
            loading: false
        });

        //inactivate Splash
        /*_to = setTimeout(function() {

            $splash
                .removeClass('active')
                .addClass('inactive');

            clearTimeout(_to);
        }, 200);*/
    }

    render(props) {

        props = Object.assign({}, this.props);

        return (
            <div
                className={[gfClassName('splash-screen'),
                    (this.state.open ? 'active' : '')
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
                        <SocialMedia className="vk" />
                        <SocialMedia className="instagram" />
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