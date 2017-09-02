import React from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { setUserAccount } from '../../../actions/user.jsx';

import { gfClassName } from '../../helper';

let io = null;

class TrainingBox extends React.Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    readyToFight() {
        io
            .emit('ready', {
                message: 'AMA READY'
            })
    }

    componentDidMount() {

        io = $dw(window).webSocket('event');

        let readyToFight = this.readyToFight;

        var _to = setTimeout(function() {
            clearTimeout(_to);

            console.log('2 Seconds has passed!');

            readyToFight()

        }, 2000);

        io
            .on('ready', function(msg) {
                alert(msg);
            })
    }

    render(props) {

        props = {...this.props};

        let trainingMode = props.trainingMode,
            readyToFight = this.readyToFight;

        return (
            <div
                id={gfClassName("training-box")}
                className={[
                    gfClassName("training-box"),
                    (!trainingMode ? "hidden" : "")
                ].join(" ")}
            >
                <button onClick={readyToFight}>ready to fight</button>
                <div className="progress progress-0"></div>
            </div>
        )
    }
}

export default connect(state => {return {
    user: state.user,
    trainingMode: state.app.trainingMode
}}, dispatch => {return {
    setUserAccount: bindActionCreators(setUserAccount, dispatch)
}})(TrainingBox);