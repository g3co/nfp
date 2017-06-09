import React, {PropTypes} from 'react';
import {
    ui,
    colors,
    gfClassName
} from '../../helper';

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

    render() {
        return (
            <div
                className={gfClassName("logo")}
            >
                <div id="progress"><dt></dt><dd></dd></div>
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
            </div>
        )
    }
}