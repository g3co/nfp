import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactMapboxGl,
{
    Layer,
    Feature,
    Marker,
    Popup
} from 'react-mapbox-gl';

import {
    gfClassName
} from '../../helper';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import * as instantActions from '../../../actions/instant.jsx';

import Fighter from '../../../containers/Fighter';
import Gym from '../../../containers/Gym';

const MapboxData = Object.freeze({
    accessToken: 'pk.eyJ1IjoicnNodGciLCJhIjoiY2o0ZmViN29oMTcwcjJ3bWs3M3I1eHg1dyJ9.05e-MJ6_PyeRpW65IwsLxw',
    style: 'mapbox://styles/rshtg/cj4fouv633ifj2ss6lv9ydvog'
});

const Mapbox = ReactMapboxGl({
    accessToken: MapboxData.accessToken,
    minZoom: 11,
    maxZoom: 18
});

class Map extends React.Component {

    constructor(props) {
        super(props);
    }

    getMapboxGL() {
        return window.MapboxGL
    }

    initMapbox(Map) {
        return window.MapboxGL = Map
    }

    render(props) {

        props = {...this.props};

        let getMapboxGL = this.getMapboxGL,
            initMapbox = this.initMapbox,
            translations = props.translations,
            fighters = props.fighters,
            gyms = props.gyms,
            currentPosition = props.currentPosition,
            allowTracking = props.allowTracking,
            instantActions = props.instantActions,
            switchTracking = props.switchTracking;
        
        return (
            <Mapbox
                style={MapboxData.style}
                containerStyle={{
                    height: "100vh",
                    width: "100vw"
                  }}
                movingMethod="easeTo"
                center={currentPosition}
                zoom={[13]}
                onRender={initMapbox}
                onClick={function(map, e) {
                    console.log('Map: %o',map);
                    console.log('Event: %o',e)
                }}
            >
                <Marker
                    coordinates={currentPosition}
                    className={[
                        gfClassName("geo--tracker"),
                        (allowTracking ? "active" : "")
                    ].join(' ')}
                    onClick={switchTracking}
                >
                    <div><i>&nbsp;</i></div>
                </Marker>
                {fighters.map((fighter, i) =>
                    <Marker
                        className={gfClassName("geo--fighter")}
                        coordinates={fighter.position}
                        anchor="bottom"
                        key={i}
                        onClick={() => {
                            instantActions.write({
                                header: [
                                    <span className="material-icons">arrow_upward</span>,
                                    translations.INSTANT.FIGHTER,
                                    <span className="material-icons">person_add</span>
                                ],
                                content: (
                                <Fighter
                                    id={fighter.id}
                                    unload={instantActions.write}
                                />)
                            })
                        }}
                    >
                        <div><img
                            src={fighter.photo}
                        /></div>
                    </Marker>
                )}
                {gyms.map((gym, i) =>
                    <Marker
                        className={gfClassName("geo--gym")}
                        coordinates={gym.location}
                        anchor="bottom"
                        key={i}
                        onClick={() => (
                            instantActions.write({
                                header: [
                                    <span className="material-icons">arrow_upward</span>,
                                    translations.INSTANT.GYM,
                                    <span className="material-icons">phone</span>
                                ],
                                content: (
                                <Gym
                                    id={gym.id}
                                    unload={instantActions.write}
                                />)
                            })
                        )}
                    >
                        <div>&nbsp;</div>
                    </Marker>
                )}
            </Mapbox>
        )
    }
}
export default connect(() => {return {}}, dispatch => {return {
    instantActions: bindActionCreators(instantActions, dispatch)
}})(Map);
