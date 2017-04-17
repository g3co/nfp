import React, { PropTypes } from 'react';
import Slider from 'material-ui/Slider';

import {
    i18n,
    ui,
    colors,
    gfClassName
} from '../../helper';

const translations = i18n('ru');

export default class ActionBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showFilterWindow: false,
            editBoxState: false,
            selectedWeight: 4,
            selectedHeight: 170
        }
    }

    searchFilter(event) {

        let
            button = event.target,
            showFilterWindow = !this.state.showFilterWindow,
            editBoxState = true
            ;

        this.setState({
            showFilterWindow,
            editBoxState
        });
    }

    hideEditBox(event) {

        let
            editBoxState = false
            ;

        this.setState({
            editBoxState
        });
    }

    changeWeight(event, value) {

        let
            selectedWeight = value
            ;

        this.setState({
            selectedWeight
        })
    }

    changeHeight(event, value) {

        let input = !!event ? event.target : false;

        if(input) {
            let
                _min = parseInt(input.min),
                _max = parseInt(input.max),
                _value = parseInt(!!input && input.value ? input.value : 0);

            _value = _value < _min ? _min : _value >= _max ? _max : _value;

            value = _value || value;
        }

        let selectedHeight = value;

        this.setState({
            selectedHeight
        })
    }

    height2Feet() {

    }

    render() {

        let
            sliderStyle = {
                height: 160,
                margin: 0
            },
            minHeight = 145,
            maxHeight = 220;

        return (
            <aside className={gfClassName("actionbar")}>
                <aside className={gfClassName("toolbar")}>
                    <header className={gfClassName("toolbar__header")}>
                        <span className="material-icons left-act">search</span>
                        <input
                            type="text"
                            placeholder={translations.LABELS.SEARCH_PLACEHOLDER}
                        />
                        <span
                            className="material-icons right-act"
                            onClick={this.searchFilter.bind(this)}
                        >settings</span>
                    </header>
                    <section className={gfClassName("toolbar__toggle")}>
                        <div>
                            <input id="search-by-fighter" name="search_by" type="radio"/>
                            <label htmlFor="search-by-fighter">
                                <span className="material-icons">person_outline</span>
                                <span>{translations.LABELS.SEARCH_BY_FIGHTER}</span>
                            </label>
                        </div>
                        <div>
                            <input id="search-by-gym" name="search_by" type="radio"/>
                            <label htmlFor="search-by-gym">
                                <span className="material-icons">pin_drop</span>
                                <span>{translations.LABELS.SEARCH_BY_GYM}</span>
                            </label>
                        </div>
                    </section>
                    <section className={gfClassName("toolbar__list")}>
                        <ul>
                            <li>
                                <div className="list__preview">
                                    <img src="https://pbs.twimg.com/profile_images/770451855369465856/gxxut0bM.jpg" />
                                </div>
                                <div className="list__description">
                                    <mark className="description__fullname">
                                        Firstname Lastname
                                    </mark>
                                    <div className="description__state">
                                        WW-LL-DD<div className="state-pfp"></div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </section>
                </aside>
                <aside className={gfClassName("editbox"+ (this.state.editBoxState ? " active" : ""))}>
                    <header className={gfClassName("editbox__header")}>
                        <span
                            className="material-icons left-act"
                            onClick={this.hideEditBox.bind(this)}
                        >settings</span>
                        <h2>{translations.LABELS.EDITBOX_HEADER}</h2>
                        <span
                            className="material-icons right-act"
                            onClick={this.hideEditBox.bind(this)}
                        >close</span>
                    </header>
                    <section className={gfClassName("editbox__conditions")}>
                        <div className="conditions__weight">
                            <h3>{translations.LABELS.CONDITIONS.WEIGHT}</h3>
                            <Slider
                                className="conditional--slider"
                                sliderStyle={sliderStyle}
                                axis="y-reverse"
                                value={this.state.selectedWeight}
                                step={1}
                                min={0}
                                max={8}
                                onChange={this.changeWeight.bind(this)}
                            />
                            <ul
                                className="cond-weight__weightList"
                            >
                                {translations.LABELS.CONDITIONS.WEIGHT_LIST.map((item, i) =>
                                    <li
                                        className={i == this.state.selectedWeight ? "active" : ""}
                                        key={i}
                                        onClick={this.changeWeight.bind(this, null, i)}
                                    >
                                        {item}
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div className="conditions__height">
                            <h3>{translations.LABELS.CONDITIONS.HEIGHT}</h3>
                            <Slider
                                className="conditional--slider"
                                sliderStyle={sliderStyle}
                                axis="y"
                                value={this.state.selectedHeight}
                                step={1}
                                min={minHeight}
                                max={maxHeight}
                                onChange={this.changeHeight.bind(this)}
                            />
                            <div
                                className="cond-height__heightOption"
                            >
                                <span className="heightOption--max">
                                    <u>{maxHeight}</u>
                                    <b>{this.height2Feet(maxHeight)}</b>
                                </span>
                                <div className="heightOption--current">
                                    <input
                                        className="height--centi"
                                        type="number"
                                        value={this.state.selectedHeight}
                                        min={minHeight}
                                        max={maxHeight}
                                        onChange={this.changeHeight.bind(this)}
                                    />
                                    <input
                                        className="height--feet"
                                        type="text"
                                        value={this.height2Feet(this.state.selectedHeight)}
                                        onChange={this.changeHeight.bind(this)}
                                    />
                                </div>
                                <span className="heightOption--min">
                                    <u>{minHeight}</u>
                                    <b>{this.height2Feet(minHeight)}</b>
                                </span>
                            </div>
                        </div>
                    </section>
                </aside>
            </aside>
        )
    }

}