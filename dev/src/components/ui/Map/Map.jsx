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

const Mapbox = ReactMapboxGl({
    accessToken: 'pk.eyJ1IjoicnNodGciLCJhIjoiY2o0ZmViN29oMTcwcjJ3bWs3M3I1eHg1dyJ9.05e-MJ6_PyeRpW65IwsLxw',
    minZoom: 11,
    maxZoom: 18
});

let _mapbox;

export default class Map extends React.Component {

    constructor(props) {
        super(props);
    }

    initMapbox(Map) {
        return _mapbox = Map;
    }

    render(props) {

        props = {...this.props};

        let $mapbox = findDOMNode(this),
            initMapbox = this.initMapbox,
            fighters = props.fighters,
            gyms = props.gyms,
            currentPosition = props.currentPosition,
            trackLastGeo = props.trackLastGeo,
            switchTrackLastGeo = props.switchTrackLastGeo;
        
        return (
            <Mapbox
                style="mapbox://styles/rshtg/cj4fouv633ifj2ss6lv9ydvog"
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
                        (trackLastGeo ? "active" : "")
                    ].join(' ')}
                    onClick={function() {
                        let $this = $dw('.'+ gfClassName("geo--tracker")),
                            classTrackGeo = "active";

                            _mapbox.flyTo({
                                center: currentPosition
                            });

                            if(switchTrackLastGeo()) {
                                $this
                                    .addClass(classTrackGeo);

                                return false
                            }

                            $this
                                .removeClass(classTrackGeo);

                        return false
                    }}
                >
                    <div><i>&nbsp;</i></div>
                </Marker>
                {fighters.map((fighter, i) =>
                    <Marker
                        className={gfClassName("geo--fighter")}
                        coordinates={fighter.position}
                        anchor="bottom"
                        key={i}
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
                    >
                        <div>&nbsp;</div>
                    </Marker>
                )}
            </Mapbox>
        )
    }
}