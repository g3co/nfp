import React from 'react';
import { findDOMNode } from 'react-dom';
import { gfClassName } from '../../components/helper';

export default class Gym extends React.Component {

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
            .request(`/api/v1/place/${id}`)
            .then(function(gym) {
                $progress.attr('data-value', 100);

                if(!!gym == false) {
                    return
                }

                setState(gym);
            })
    }

    render(props) {

        props = {...this.props};

        let gym = this.state,
            translations = props.translations,
            displayName = gym.name,
            address = !!gym.address ? gym.address : translations.LABELS.NO_ADDRESS;

        return (
            <div
                className={[
                    "gym-view",
                    (!!displayName ? "visible" : "")
                ].join(" ")}
            >
                <section
                    className="gym-view__general"
                >
                    <h2>
                        <small>{address}</small>
                        {displayName}
                    </h2>
                </section>
                <section
                    className="gym-view__about"
                >
                </section>
            </div>
        )
    }

}