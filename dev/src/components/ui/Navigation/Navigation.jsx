import React from 'react';
import { findDOMNode } from 'react-dom';
import Map from '../Map';
import {
    gfClassName
} from '../../helper';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import * as placesActions from '../../../actions/places.jsx';
import * as fightersActions from '../../../actions/fighters.jsx';

let _interval;

class Navigation extends React.Component {

    constructor(props) {
        super(props);

        this.updateCurrentPosition = this.updateCurrentPosition.bind(this);
        this.getFightersNearby = this.getFightersNearby.bind(this);
        this.setFightersNearby = this.setFightersNearby.bind(this);
        this.getGYMsNearby = this.getGYMsNearby.bind(this);
        this.setGYMsNearby = this.setGYMsNearby.bind(this);

        this.state = {
            currentPosition: [-28.024, 40.887],
            currentAdv: {},
            allowTrackLastGeo: true
        };

        if('geolocation' in navigator && this.state.allowTrackLastGeo) {
            _interval = setInterval(this.updateCurrentPosition, 3000);
        } else {
            alert('To continue, please, get access to your geo location.');
        }
    }

    getProgressBar() {
        return $dw('#progress')
    }

    updateCurrentPosition() {

        let getFightersNearby = this.getFightersNearby,
            getGYMsNearby = this.getGYMsNearby;

        navigator.geolocation.getCurrentPosition(function(position) {

            if(!!position && !!position.coords) {
                let currentPosition = [position.coords.longitude, position.coords.latitude],
                    currentAdv,
                    lngDiff = Math.abs(this.state.currentPosition[0] - currentPosition[0]),
                    latDiff = Math.abs(this.state.currentPosition[1] - currentPosition[1]);

                currentAdv = position.coords;

                if((isNaN(lngDiff) || isNaN(latDiff)) || (lngDiff < 5 && latDiff < 5)) {
                    return
                }

                this.setState({
                    currentPosition,
                    currentAdv
                });

                getFightersNearby();
                getGYMsNearby();

                return
            }

            clearInterval(_interval)
        }.bind(this))
    }

    getFightersNearby() {
        let $this = $dw(findDOMNode(this)),
            $progress = this.getProgressBar(),
            setFightersNearby = this.setFightersNearby;

        $progress.attr('data-value', 15);

        return $this
            .request('/api/v1/fighters')
            .then(setFightersNearby)
            .then(function() {
                $progress.attr('data-value', 70)
            })
    }

    getGYMsNearby() {
        let $this = $dw(findDOMNode(this)),
            $progress = this.getProgressBar(),
            setGYMsNearby = this.setGYMsNearby;

        return $this
            .request('/api/v1/places')
            .then(setGYMsNearby)
            .then(function() {
                $progress.attr('data-value', 100)
            })
    }

    setFightersNearby(fighters) {
        this.props.fightersActions.setFightersNearby(fighters);

        return fighters
    }

    setGYMsNearby(gyms) {
        this.props.placesActions.setPlacesNearby(gyms);

        return gyms
    }

    switchTrackLastGeo() {

        let allowTrackLastGeo = !this.state.allowTrackLastGeo;

        this.setState({
            allowTrackLastGeo
        });

        return allowTrackLastGeo
    }

    render() {

        let props = {...this.props},
            translations = props.translations,
            fighters = props.fighters.nearby,
            gyms = props.places.nearby,
            currentPosition = this.state.currentPosition,
            trackLastGeo = this.state.allowTrackLastGeo,
            switchTrackLastGeo = this.switchTrackLastGeo.bind(this);

        return (
            <div
                id={gfClassName("navigation")}
                className={gfClassName("navigation")}
            >
                <Map
                    translations={translations}
                    currentPosition={currentPosition}
                    fighters={fighters}
                    gyms={gyms}
                    switchTrackLastGeo={switchTrackLastGeo}
                    trackLastGeo={trackLastGeo}
                />
            </div>
        )
    }
}

export default connect(state => {return {
    translations: state.locale.translations,
    places: state.places,
    fighters: state.fighters
}}, dispatch => {return {
    placesActions: bindActionCreators(placesActions, dispatch),
    fightersActions: bindActionCreators(fightersActions, dispatch)
}})(Navigation);