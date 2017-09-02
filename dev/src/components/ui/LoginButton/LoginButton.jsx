import React from 'react';
import FontIcon from 'material-ui/FontIcon';

import { gfClassName } from '../../helper';

export default class LoginButton extends React.Component {

    constructor(props) {
        super(props);
    }

    render(props) {

        props = {...this.props};

        return (
            <button
                className={gfClassName("action__login")}
                type="button"
                onClick={this.modalShow}
            >
                <FontIcon
                    className="material-icons"
                    color="#fff"
                    style={{
                        fontSize: '2em'
                    }}
                >person</FontIcon>
                <span>{props.translations.LABELS.LOG_IN}</span>
            </button>
        )
    }
}