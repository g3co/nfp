import React from 'react';
import { connect } from 'react-redux';

import {
    gfClassName
} from '../../helper';

import ChooseLanguage from '../ChooseLanguage';

class NetFight extends React.Component {

    constructor(props) {
        super(props);

        this.handleDropdown = this.handleDropdown.bind(this);

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

        props = {...this.props};

        let translations = props.translations,
            currentPosition = props.currentPosition,
            setTranslation = props.setTranslation,
            mapMode = props.mapMode,
            handleDropdown = this.handleDropdown,
            active = this.state.active;

        return (
            <div
                className={[
                    gfClassName("logo"),
                    (mapMode ? "map-mode" : "")
                ].join(" ")}
            >
                <span>nfp</span>
                <ul
                    className={gfClassName([
                        "menu",
                        (active ? "active": "")
                    ].join(" "))}
                    onClick={handleDropdown}
                    role="navigation"
                >
                    {translations.HEADER.map(item =>
                        <li key={item.id}>
                            <a
                                role="link"
                                href={item.route}
                                key={item.id}
                                tabIndex={item.id}>
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
                    setTranslation={setTranslation}
                />
            </div>
        )
    }
}

export default connect(state => {return {
    currentPosition: state.user.currentPosition,
    mapMode: state.app.mapMode
}})(NetFight);