import React, { PropTypes } from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';

import {
    gfClassName
} from '../../helper';

import { connect } from 'react-redux';

class Instant extends React.Component {
    constructor(props) {
        super(props);

        this.fade = this.fade.bind(this);

        this.state = {
            ready: false
        }
    }

    fade(dir, extended) {

        let $instant = $dw(findDOMNode(this)),
            _className = $instant.attr('class'),
            state = "ready";

        if(dir) {
            return new Promise(function(resolve, reject) {
                if(!!~_className.indexOf(state) == false) {
                    let _in = setTimeout(function() {

                        if(extended) {
                            $instant.addClass('extended')
                        }

                        resolve($instant.addClass(state));
                        clearTimeout(_in);
                    }, 100);
                }
            })
        }

        return new Promise(function(resolve, reject) {
            if(!!~_className.indexOf(state)) {
                $instant.removeClass(state);

                let _in = setTimeout(function() {
                    resolve($instant.removeClass('extended'));
                    clearTimeout(_in);
                }, 500);
            }
        })
    }

    componentWillUpdate(props) {

        let extended = !!props.header.leftCTA && !!props.header.leftCTA.props.children.match(/arrow_upward/i),
            active = !!props.header.title,
            ready = this.state.ready,
            fade = this.fade,
            setState = this.setState.bind(this);

        if(active && !ready) {
            return fade(true, extended)
                .then(function() {
                    setState({
                        ready: true
                    });
                })
        }
    }

    render(props) {

        props = {...this.props};
        
        let jid = gfClassName("instant"),
            setState = this.setState.bind(this),
            $this = $dw(`#${jid}`),
            ready = this.state.ready,
            extended = this.state.extended,
            fade = this.fade,
            active = !!props.header.title,
            header = props.header,
            content = !!props.content ? props.content : <div className="loader--radial"></div>;

        return (
            <section
                id={jid}
                className={[
                    jid,
                    (active ? "active" : "")
                ].join(" ")}
            >
                <div className="instant-container">
                    <header>
                        <b
                            onClick={function() {
                                fade(false)
                                    .then(function() {
                                        setState({
                                            ready: false
                                        });
                                        $this.trigger('unload')
                                    })
                            }}
                        >{header.leftCTA}</b>
                        <h5>{header.title}</h5>
                        <i
                            onClick={function() {
                                fade(false)
                                    .then(function() {
                                        setState({
                                            ready: false
                                        });
                                        $this.trigger('action')
                                    })
                            }}
                        >{header.rightCTA}</i>
                    </header>
                    <div className="container__body">
                        {content}
                    </div>
                </div>
                <i>&nbsp;</i>
            </section>
        )
    }
}

export default connect(state => {return {
    header: state.instant.header,
    content: state.instant.content
}})(Instant);