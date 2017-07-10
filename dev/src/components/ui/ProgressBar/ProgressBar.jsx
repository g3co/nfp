import React from 'react';
import { findDOMNode } from 'react-dom';

import {
    gfClassName
} from '../../helper';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import * as appActions from '../../../actions/app.jsx';

class ProgressBar extends React.Component {

    constructor(props) {
        super(props);

        this.checkProgress = this.checkProgress.bind(this);
    }

    checkProgress() {
        let $progress = $dw(findDOMNode(this)),
            progress = this.props.progress,
            updateProgress = this.props.appActions.setAppProgress,
            value = +$progress.attr('data-value');

        if(progress != value) {
            updateProgress(value)
        }
    }

    componentDidMount() {

        let props = Object.assign({}, this.props),
            $progress = $dw(findDOMNode(this)),
            checkProgress = this.checkProgress,
            progress = props.progress;

        setInterval(checkProgress, 250);

    }

    render(props) {

        props = Object.assign({}, this.props);

        let progress = props.progress;

        return (
            <div
                id="progress"
                className={(progress >= 100 ? "done" : "")}
                style={{
                    width: progress +'%'
                }}
            >
                <dt>&nbsp;</dt>
                <dd>&nbsp;</dd>
            </div>
        )
    }

}

export default connect(state => {return {
    progress: state.app.progress
}}, dispatch => {return {
    appActions: bindActionCreators(appActions, dispatch)
}})(ProgressBar);