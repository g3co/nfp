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
            id = props.id;

        if(!!id == false) {
            return false
        }

        let $this = $dw(findDOMNode(this)),
            $instant = $dw(`#${gfClassName("instant")}`),
            unload = props.unload;

        $instant
            .once('unload', function() {
                unload()
            });

        $this
            .request(`/api/v1/place/${id}`)
            .then(function(gym) {
                if(!!gym == false) {
                    return
                }

                this.setState(gym);
            }.bind(this))
    }

    render(props) {

        props = Object.assign({}, this.props);

        let gym = this.state;

        return (
            <div>
                {gym.name}
            </div>
        )
    }

}