import React from 'react';
import { findDOMNode } from 'react-dom';

import {
    gfClassName,
    declOf,
    getAge
} from '../../components/helper';

export default class Fighter extends React.Component {
    
    constructor(props) {

        super(props);

        this.state = {}
    }

    componentWillMount() {
        let props = Object.assign({}, this.props),
            setState = this.setState.bind(this),
            id = props.id;

        if(!!id == false) {
            return false
        }

        let $this = $dw(findDOMNode(this)),
            $instant = $dw(`#${gfClassName("instant")}`),
            $progress = $dw("#progress"),
            unload = props.unload;

        $progress.attr('data-value', 35);

        $instant
            .once('unload', unload);

        $this
            .request(`/api/v1/fighter/${id}`)
            .then(function(fighter) {
                $progress.attr('data-value', 100);

                if(!!fighter == false) {
                    return
                }

                setState(fighter);
            })
    }

    render(props) {

        props = Object.assign({}, this.props);

        let fighter = this.state,
            translations = props.translations,
            displayName = [fighter.firstName, fighter.lastName].join(' '),
            age = getAge(new Date(fighter.dateBirth)),
            weight = !!fighter.conditions ? fighter.conditions.weight : '&mdash;',
            height = !!fighter.conditions ? fighter.conditions.height : '&mdash;',
            wins = !!fighter.stats ? fighter.stats.wins.length : 0,
            loss = !!fighter.stats ? fighter.stats.loses.length : 0,
            skills = !!fighter.skills ? Object.keys(fighter.skills).filter(function(key) {
                return !!fighter.skills[key]
            }) : [],
            _printAge = declOf(translations.DECLINES.AGE);

        skills = !!skills.length ? skills.map(function(key) {return translations.LABELS.MARTIAL_ARTS[key]}) : [translations.LABELS.NO_SKILLS];

        return (
            <div
                className={[
                    "fighter-view",
                    (!!fighter.firstName ? "visible" : "")
                ].join(" ")}
            >
                <section className="fighter-view__bio">
                    <aside className="fighter-wins">
                        {wins}
                        <span>{translations.LABELS.WINS_SHORT}</span>
                    </aside>
                    <aside className="fighter-loss">
                        {loss}
                        <span>{translations.LABELS.LOSS_SHORT}</span>
                    </aside>
                    <picture className="fighter-avatar">
                        <img src={fighter.avatar} alt={displayName} />
                    </picture>
                    <h2>
                        <small>{skills.join(' / ')}</small>
                        {displayName}
                    </h2>
                </section>
                <section className="fighter-view__content">
                    <div className="content-action">
                        <span
                            className="fighter__age"
                            data-label={translations.LABELS.CONDITIONS.AGE}
                        >{age} {_printAge(age)}</span>
                        <span
                            className="fighter__weight"
                            data-label={translations.LABELS.CONDITIONS.WEIGHT}
                        >{weight} {translations.LABELS.CONDITIONS.WEIGHT_UNIT}</span>
                        <span
                            className="fighter__height"
                            data-label={translations.LABELS.CONDITIONS.HEIGHT}
                        >{height} {translations.LABELS.CONDITIONS.HEIGHT_UNIT}</span>
                    </div>
                </section>
            </div>
        )
    }

}