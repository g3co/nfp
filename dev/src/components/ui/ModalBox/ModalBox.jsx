import React, { PropTypes } from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';

import {
    gfClassName
} from '../../helper';

export default class ModalBox extends React.Component {
    constructor(props) {
        super(props);

        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.load = this.load.bind(this);
        this.error = this.error.bind(this);

        this.state = {
            visible: false,
            route: false
        }
    }

    show(event) {
        let visible = true,
            route = !!event.detail ? event.detail.route : false,
            _visible = this.state.visible,
            lang = this.props.lang,
            modal = findDOMNode(this),
            $modal = $dw(modal);

        if(_visible) {
            return
        }

        $modal
            .on('click', this.hide, { bubbles: false });

        this.fade(modal, ['in', 'active'])
            .then(function() {

                this.setState({
                    visible,
                    route
                });

                $modal.trigger('ready');// AMAREADY!

                if(!!route == false) {
                    return
                }

                //send request to the URL:route
                $modal.request({
                    url: (route +'?lng='+ lang),
                    responseType: 'document'
                })
                    .then(function(response) {
                        this.load(response)
                    }.bind(this))
                    .catch(function(error) {
                        this.error(error)
                    }.bind(this))
            }.bind(this))
    }

    hide(event) {
        event.preventDefault();

        let el = event.target,
            visible = false,
            route = false,
            modal = findDOMNode(this);

        if(!el.className.match(/gf-modalbox/i)) {
            return
        }

        $dw(modal)
            .off('click', this.hide);

        this.fade(modal, ['in', 'active'])
            .then(function() {
                this.setState({
                    visible,
                    route
                });
            }.bind(this));
    }

    load(block) {
        let modal = findDOMNode(this),
            $modal = $dw(modal);

        if(!!block) {
            $modal.find('.box-body')[0].innerHTML = block.innerHTML;
        }

        $modal.addClass('ready');

        $modal.trigger('load')
    }

    error(err) {
        let modal = findDOMNode(this),
            $modal = $dw(modal);

        $modal.trigger('error')
    }

    fade(modal, states) {
        return new Promise(function(resolve, reject) {
            let [ classIn, classActive ] = states,
                _className = modal.className;

            if(!!~_className.indexOf(classIn)) {
                _className = _className.replace(classIn, '');
                modal.setAttribute('class', _className);

                resolve();

                return
            }

            _className = _className +' '+ classIn;
            modal.setAttribute('class', _className);

            var _in = setTimeout(function() {

                resolve();

                clearTimeout(_in);
            }, 10);
        })
    }

    componentDidMount() {
        $dw(findDOMNode(this))
            .on('show', this.show)
            .on('hide', this.hide);
    }

    componentWillUnmount() {
        $dw(findDOMNode(this))
            .off('show', this.show)
            .off('hide', this.hide);
    }

    render(props) {

        props = Object.assign({}, this.props);

        delete props.asPopup;
        delete props.className;

        return (
            <section
                {...props}
                className={[
                    gfClassName("modalbox"),
                    (this.props.asPopup ? "as-popup" : ""),
                    (this.state.visible ? "in active" : "")
                ].join(' ')}
            >
                <div className="modalbox__container">
                    <div className="box-body">
                        <div className="loader--radial"></div>
                    </div>
                </div>
                <i>&nbsp;</i>
            </section>
        )
    }
}