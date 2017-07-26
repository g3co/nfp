import React from 'react';
import { connect } from 'react-redux';

import {
    gfClassName
} from '../../helper';

import ChooseLanguage from '../ChooseLanguage';

class GetFight extends React.Component {

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

        let currentPosition = props.currentPosition;

        return (
            <div
                className={gfClassName("logo")}
            >
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
                <div
                    className="navbtn--location"
                    onClick={function() {
                        window.MapboxGL.flyTo({
                            center: currentPosition
                        })
                    }}
                >
                    <span className="material-icons">my_location</span>
                </div>
                <ChooseLanguage
                    setTranslation={props.setTranslation}
                />
            </div>
        )
    }
}

export default connect(state => {return {
    currentPosition: state.user.currentPosition
}})(GetFight);