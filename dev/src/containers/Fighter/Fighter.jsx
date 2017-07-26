import React from 'react';
import { findDOMNode } from 'react-dom';

import { gfClassName } from '../../components/helper';

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
            displayName = [fighter.firstName, fighter.lastName].join(' ');

        return (
            <div
                className="fighter-view"
            >
                <section
                    className="fighter-view__bio"
                >
                    <div
                        className="fighter-avatar"
                    >
                        <img src={fighter.avatar} alt={displayName} />
                    </div>
                    <h2>{displayName}</h2>
                </section>
                <section
                    className="fighter-view__content"
                >

                </section>
            </div>
        )
    }

}