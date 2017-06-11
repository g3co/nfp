import React from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';

import { gfClassName } from '../../helper';

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
            open: false
        });

        //inactivate Splash
        _to = setTimeout(function() {

            $splash
                .removeClass('active')
                .addClass('inactive');

            clearTimeout(_to);
        }, 200);
    }

    render(props) {

        props = Object.assign({}, this.props, props);

        return (
            <div
                className={[gfClassName("splash-screen"),
                    (this.state.open ? 'active' : '')
                ].join(' ')}
            >
                <h2>nfp
                    <small>net fight promotion</small>
                    <div
                        className={['loader--radial',
                            (this.state.loading ? '' : 'hidden')
                        ].join(' ')}
                    ></div>
                </h2>
            </div>
        )
    }
}