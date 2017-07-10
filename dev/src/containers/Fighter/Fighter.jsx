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
            .request(`/api/v1/fighter/${id}`)
            .then(function(fighter) {console.log('Fighter: %o', fighter);
                if(!!fighter == false) {
                    return
                }

                this.setState(fighter);
            }.bind(this))
    }

    render(props) {

        props = Object.assign({}, this.props);

        let fighter = this.state;

        return (
            <div style={{color: 'white'}}>
                {fighter.firstName}
            </div>
        )
    }

}