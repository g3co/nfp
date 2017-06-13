import React from 'react';
import Slider from 'material-ui/Slider';
import Checkbox from 'material-ui/Checkbox';

import { gfClassName } from '../../helper';

export default class ActionBar extends React.Component {

    constructor(props) {
        super(props);

        this.searchFilter = this.searchFilter.bind(this);
        this.hideEditBox = this.hideEditBox.bind(this);
        this.changeWeight = this.changeWeight.bind(this);
        this.changeHeight = this.changeHeight.bind(this);
        this.toggleSearch = this.toggleSearch.bind(this);

        this.state = {
            showFilterWindow: false,
            editBoxState: false,
            searchByFighter: true,//false: by GYM
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

        let selectedWeight = value;

        this.setState({
            selectedWeight
        })
    }

    changeHeight(event, value) {
        let selectedHeight = value;

        this.setState({
            selectedHeight
        })
    }

    checkHeight(event, value) {

        let el = !!event ? event.target : false,
            _max, _min, selectedHeight;

        if(!el) {
            return
        }

        _min = parseInt(el.min);
        _max = parseInt(el.max);

        let _value = parseInt(el.value ? el.value : 0);

        if(_value > _min && _value < _max) {

            selectedHeight = _value;
        }

        this.setState({
            selectedHeight
        });
    }

    toggleSearch(event) {
        let el = !!event ? event.target : false,
            _id, searchByFighter = true;

        if(!el) {
            return
        }

        _id = el.id;

        if(_id.match('fighter')) {
            searchByFighter = true;
        }

        if(_id.match('gym')) {
            searchByFighter = false;
        }

        this.setState({
            searchByFighter
        })
    }

    render(props) {
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
                            placeholder={this.props.translations.LABELS.SEARCH_PLACEHOLDER}
                        />
                        <span
                            className="material-icons right-act"
                            onClick={this.searchFilter}
                        >settings</span>
                    </header>
                    <section className={gfClassName("toolbar__toggle")}>
                        <div>
                            <input
                                id="search-by-fighter"
                                name="search_by"
                                type="radio"
                                checked={this.state.searchByFighter}
                                onChange={this.toggleSearch}
                            />
                            <label htmlFor="search-by-fighter">
                                <span className="material-icons">person_outline</span>
                                <span>{this.props.translations.LABELS.SEARCH_BY_FIGHTER}</span>
                            </label>
                        </div>
                        <div>
                            <input
                                id="search-by-gym"
                                name="search_by"
                                type="radio"
                                checked={!this.state.searchByFighter}
                                onChange={this.toggleSearch}
                            />
                            <label htmlFor="search-by-gym">
                                <span className="material-icons">pin_drop</span>
                                <span>{this.props.translations.LABELS.SEARCH_BY_GYM}</span>
                            </label>
                        </div>
                    </section>
                    <section className={gfClassName("toolbar__list")}>
                        <ul>
                            {/*<li>
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
                                map from Redux
                            </li>*/}
                        </ul>
                    </section>
                </aside>
                <aside
                    className={gfClassName("editbox"+
                        (this.state.editBoxState ? " active" : "")+
                        (this.state.searchByFighter ? " by-fighter" : " by-gym")
                    )}
                >
                    <header className={gfClassName("editbox__header")}>
                        <span
                            className="material-icons left-act"
                            onClick={this.hideEditBox}
                        >settings</span>
                        <h2>{this.props.translations.LABELS.EDITBOX_HEADER}</h2>
                        <span
                            className="material-icons right-act"
                            onClick={this.hideEditBox}
                        >close</span>
                    </header>
                    <section className={gfClassName("editbox__conditions")}>
                        <div className="conditions__weight">
                            <h3>{this.props.translations.LABELS.CONDITIONS.WEIGHT}</h3>
                            <Slider
                                className="conditional--slider"
                                sliderStyle={sliderStyle}
                                axis="y-reverse"
                                value={this.state.selectedWeight}
                                step={1}
                                min={0}
                                max={8}
                                onChange={this.changeWeight}
                            />
                            <ul
                                className="cond-weight__weightList"
                            >
                                {this.props.translations.LABELS.CONDITIONS.WEIGHT_LIST.map((item, i) =>
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
                            <h3>
                                {this.props.translations.LABELS.CONDITIONS.HEIGHT}
                                <small>({this.props.translations.LABELS.CONDITIONS.HEIGHT_UNIT})</small>
                            </h3>
                            <div
                                className="cond-height__heightOption"
                                style={{
                                    height: sliderStyle.height
                                }}
                            >
                                <span className="heightOption--max">
                                    {maxHeight}
                                </span>
                                <div
                                    className="heightOption--current"
                                    style={{
                                        top: (100 - (100 * (this.state.selectedHeight - minHeight) / (maxHeight - minHeight))) +'%'
                                    }}
                                >
                                    <input
                                        className="height--centi"
                                        type="number"
                                        value={this.state.selectedHeight}
                                        min={minHeight}
                                        max={maxHeight}
                                        placeholder="0"
                                        onChange={this.checkHeight.bind(this)}
                                    />
                                </div>
                                <span className="heightOption--min">
                                    {minHeight}
                                </span>
                            </div>
                            <Slider
                                className="conditional--slider"
                                sliderStyle={sliderStyle}
                                axis="y"
                                value={this.state.selectedHeight}
                                step={1}
                                min={minHeight}
                                max={maxHeight}
                                onChange={this.changeHeight}
                            />
                        </div>
                    </section>
                    <section className={gfClassName("editbox__martials")}>
                        <h3>
                            {this.props.translations.LABELS.MARTIALS}
                            <small>{this.props.translations.LABELS.MARTIALS_PROMPT}</small>
                        </h3>
                        <div className="fw">
                            <ul>
                                {Object.keys(this.props.translations.LABELS.MARTIAL_ARTS).map((item, i) => {
                                    let itemId = "ma-"+ i,
                                        martialArts = this.props.translations.LABELS.MARTIAL_ARTS,
                                        itemUnique = "martial-art "+ item;

                                    return(
                                        <li
                                            className={itemUnique}
                                            key={i}
                                        >
                                            <label
                                                htmlFor={itemId}
                                            >
                                                <span>{martialArts[item]}</span>
                                                <Checkbox
                                                    id={itemId}
                                                    labelPosition="left"
                                                    style={{
                                                        position: "absolute",
                                                        width: "auto",
                                                        display: "inline-block"
                                                    }}
                                                    onCheck={function(event) {

                                                        let el = !!event ? event.target : false,
                                                            item, _itemClassName;

                                                        if(!el) {
                                                            return
                                                        }

                                                        item = el.closest('.martial-art');

                                                        if(!item) {
                                                            return
                                                        }

                                                        _itemClassName = item.className;

                                                        if(el && el.checked) {
                                                            _itemClassName = _itemClassName +' checked';
                                                        } else {
                                                            _itemClassName = _itemClassName.replace(/checked/ig, '');
                                                        }

                                                        item.setAttribute('class', _itemClassName);
                                                    }}
                                                />
                                            </label>
                                        </li>)
                                })}
                            </ul>
                        </div>
                    </section>
                    <section className={gfClassName("editbox__action")}>
                        <button>
                            {this.props.translations.LABELS.EDITBOX_ACCEPT}
                        </button>
                    </section>
                </aside>
            </aside>
        )
    }

}