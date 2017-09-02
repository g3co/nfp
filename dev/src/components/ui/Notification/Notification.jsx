import React from 'react';
import { findDOMNode } from 'react-dom';

import {
    gfClassName
} from '../../helper';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setAppNotification } from '../../../actions/app.jsx';

let _timeout;

class Notification extends React.Component {

    constructor(props) {
        super(props);

        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
    }

    show() {
        let $this = $dw(findDOMNode(this)),
            hide = this.hide;

        var _to = setTimeout(function() {
            $this.addClass('ready');
            _timeout = setTimeout(hide, 5000);
            clearTimeout(_to);
        }, 250);
    }

    hide() {
        let $this = $dw(findDOMNode(this)),
            setNotification = this.props.setNotification.bind(this);
        
        $this.removeClass('ready');
        
        var _to = setTimeout(function() {
            setNotification();
            clearTimeout(_to);
        }, 250);
        
        clearTimeout(_timeout);
    }

    componentWillUpdate(props) {
        clearTimeout(_timeout);

        let label = props.label,
            show = this.show;

        if(!!label) {
            return show()
        }
    }

    render(props) {

        props = {...this.props};

        let selector = gfClassName("notification"),
            hide = this.hide,
            label = props.label,
            type = props.type || 'error';

        return (
            <div
                id={selector}
                className={[
                    selector,
                    (!!label ? "active" : ""),
                    type
                ].join(' ')}
            >
                <span>
                    {label}
                </span>
            </div>
        )
    }

}

export default connect(state => {return {
    type: state.app.notification.type,
    label: state.app.notification.text
}}, dispatch => {return {
    setNotification: bindActionCreators(setAppNotification, dispatch)
}})(Notification);