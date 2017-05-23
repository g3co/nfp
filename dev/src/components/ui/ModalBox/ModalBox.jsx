import React, { PropTypes } from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';

import {
    i18n,
    ui,
    colors,
    gfClassName
} from '../../helper';

import SocialMedia from '../SocialMedia';

const translations = i18n('ru');

export default class ModalBox extends React.Component {
    constructor(props) {
        super(props);

        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.pullData = this.pullData.bind(this);

        this.state = {
            visible: false,
            route: false
        }
    }

    show(event) {
        let visible = true,
            route = !!event.detail ? event.detail.route : false,
            _visible = this.state.visible,
            modal = findDOMNode(this);

        if(_visible) {
            return
        }

        modal.addEventListener('click', this.hide, {bubbles: false});

        this.fade(modal, ['in', 'active'])
            .then(function() {
                this.setState({
                    visible,
                    route
                })
            }.bind(this))
            .then(this.pullData);
    }

    hide(event) {
        event.preventDefault();

        let el = event.target,
            visible = false,
            route = !!event.detail ? event.detail.route : false,
            modal = findDOMNode(this);

        if(!el.className.match(/gf-modalbox/i)) {
            return
        }

        modal.removeEventListener('click', this.hide);

        this.fade(modal, ['in', 'active'])
            .then(function() {
                this.setState({
                    visible,
                    route
                })
            }.bind(this));
    }

    pullData() {

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
        findDOMNode(this).addEventListener('show', this.show);
        findDOMNode(this).addEventListener('hide', this.hide);
        findDOMNode(this).addEventListener('pullData', this.pullData);
    }

    componentWillUnmount() {
        findDOMNode(this).removeEventListener('show', this.show);
        findDOMNode(this).removeEventListener('hide', this.hide);
        findDOMNode(this).removeEventListener('pullData', this.pullData);
    }

    render(props) {

        props = Object.assign({}, this.props);

        delete props.asPopup;
        delete props.className;

        return (
            <section
                {...props}
                className={gfClassName("modalbox")+
                    (this.props.asPopup ? " as-popup" : "")+
                    (this.state.visible ? " in active" : "")
                }
            >
                <div className="modalbox__container">
                    <div className="box-body">
                        <button>check</button>
                        <SocialMedia
                            className="instagram"
                        />
                        <SocialMedia
                            className="vk"
                        />
                    </div>
                </div>
                <i></i>
            </section>
        )
    }
}