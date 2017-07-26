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
import { setAppNotification } from '../../../actions/app.jsx';
import { updateCurrentPosition } from '../../../actions/user.jsx';

let _interval;

class Navigation extends React.Component {

    constructor(props) {
        super(props);

        this.setState = this.setState.bind(this);
        this.updateCurrentPosition = this.updateCurrentPosition.bind(this);
        this.getFightersNearby = this.getFightersNearby.bind(this);
        this.setFightersNearby = this.setFightersNearby.bind(this);
        this.getGYMsNearby = this.getGYMsNearby.bind(this);
        this.setGYMsNearby = this.setGYMsNearby.bind(this);
        this.updateNotification = this.updateNotification.bind(this);
        this.getCurrentPosition = this.getCurrentPosition.bind(this);

        this.state = {
            ready: false,
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

    updateNotification(data) {
        return this.props.setNotification(data)
    }

    updateCurrentPosition() {

        let getCurrentPosition = this.getCurrentPosition;

        /*getCurrentPosition({
            coords: {
                longitude: 49.263929,
                latitude: 53.509613
            }
        })*/

        navigator.geolocation.getCurrentPosition(getCurrentPosition);
    }

    getCurrentPosition(position) {

        let $window = $dw(window),
            state = this.state,
            props = this.props,
            setState = this.setState,
            updateCurrentPosition = props.updateCurrentPosition,
            currentPosition = props.currentPosition,
            getFightersNearby = this.getFightersNearby,
            getGYMsNearby = this.getGYMsNearby;

        if(!!position && !!position.coords) {
            let _currentPosition = [position.coords.longitude, position.coords.latitude],
                currentAdv,
                lngDiff = Math.abs(currentPosition[0] - _currentPosition[0]),
                latDiff = Math.abs(currentPosition[1] - _currentPosition[1]);

            currentAdv = position.coords;

            if((isNaN(lngDiff) || isNaN(latDiff)) || (lngDiff < 5 && latDiff < 5)) {
                return
            }

            updateCurrentPosition(_currentPosition);

            setState({
                currentAdv
            });

            $window
                .request({
                    type: 'put',
                    url: '/api/v1/account',
                    body: {
                        lastGeo: _currentPosition
                    }
                })
                .then(getFightersNearby)
                .then(getGYMsNearby);

            return
        }

        clearInterval(_interval)
    }

    getFightersNearby() {
        let $this = $dw(findDOMNode(this)),
            $progress = this.getProgressBar(),
            setFightersNearby = this.setFightersNearby;

        $progress.attr('data-value', 15);

        return $this
            .request('/api/v1/fighters')
            .then(setFightersNearby)
            .then(function(fighters) {
                $progress.attr('data-value', 50);
                return fighters
            })
    }

    getGYMsNearby(fighters) {
        let $this = $dw(findDOMNode(this)),
            $progress = this.getProgressBar(),
            updateNotification = this.updateNotification,
            setGYMsNearby = this.setGYMsNearby,
            setState = this.setState.bind(this);

        $progress.attr('data-value', 70);

        return $this
            .request('/api/v1/places')
            .then(setGYMsNearby)
            .then(function(gyms) {
                $progress.attr('data-value', 100);

                $this.trigger('ready');

                setState({ready: true});

                updateNotification({
                    type: 'success',
                    text: `Рядом с Вами ${gyms.length} залов`
                });

                return gyms
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
            ready = this.state.ready,
            translations = props.translations,
            fighters = props.fighters.nearby,
            gyms = props.places.nearby,
            currentPosition = props.currentPosition,
            trackLastGeo = this.state.allowTrackLastGeo,
            switchTrackLastGeo = this.switchTrackLastGeo.bind(this);

        return (
            <div
                id={gfClassName("navigation")}
                className={[
                    gfClassName("navigation"),
                    (ready ? "ready" : "")
                ].join(' ')}
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
    fighters: state.fighters,
    currentPosition: state.user.currentPosition
}}, dispatch => {return {
    placesActions: bindActionCreators(placesActions, dispatch),
    fightersActions: bindActionCreators(fightersActions, dispatch),
    setNotification: bindActionCreators(setAppNotification, dispatch),
    updateCurrentPosition: bindActionCreators(updateCurrentPosition, dispatch)
}})(Navigation);