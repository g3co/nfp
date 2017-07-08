import React from 'react';

import {
    gfClassName
} from '../../helper';

import ChooseLanguage from '../ChooseLanguage';
import ProgressBar from '../ProgressBar';

export default class GetFight extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            active: false
        }
    }

    handleDropdown(event) {
        event.preventDefault();

        this.setState({
            active: !this.state.active
        });

        return false
    }

    render(props) {

        props = Object.assign({}, this.props);

        return (
            <div
                className={gfClassName("logo")}
            >
                <ProgressBar />
                <span>nfp</span>
                <ul
                    className={gfClassName("menu"+ (this.state.active ? " active": ""))}
                    onClick={this.handleDropdown.bind(this)}
                    role="navigation"
                >
                    {this.props.translations.HEADER.map((item, i) =>
                        <li key={i}>
                            <a role="link" href={item.route} tabIndex={i} key={i}>
                                {item.label}
                            </a>
                        </li>
                    )}
                </ul>
                <ChooseLanguage
                    setTranslation={props.setTranslation}
                />
            </div>
        )
    }
}