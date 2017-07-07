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

export default class Map extends React.Component {

    constructor(props) {
        super(props);
    }

    render(props) {

        props = {...this.props};

        let $mapbox = findDOMNode(this),
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
            >
                <Layer
                    type="symbol"
                    id="marker"
                    layout={{ "icon-image": "marker-15" }}>
                    <Feature coordinates={[-0.481747846041145, 51.3233379650232]}/>

                </Layer>
                <Marker
                    className={[
                        gfClassName("geo--tracker"),
                        (trackLastGeo ? "active" : "")
                    ].join(' ')}
                    coordinates={currentPosition}
                    anchor="bottom"
                    onClick={function() {
                        let $this = $dw('.'+ gfClassName("geo--tracker")),
                            classTrackGeo = "active";

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
                    <i>&nbsp;</i>
                </Marker>
                {fighters.map((fighter, i) =>
                    <Marker
                        className={gfClassName("geo--fighter")}
                        coordinates={fighter.lastGeo}
                        anchor="bottom"
                        key={i}
                    >
                        <div><img
                            src={fighter.avatar}
                        /></div>
                    </Marker>
                )}
                {gyms.map((gym, i) =>
                    <Marker
                        className={gfClassName("geo--gym")}
                        coordinates={gym.location}
                        anchor="bottom"
                        >
                        <div>&nbsp;</div>
                    </Marker>
                )}
                <Popup
                    coordinates={[-0.13235092163085938,51.518250335096376]}
                    offset={{
    'bottom-left': [12, -38],  'bottom': [0, -38], 'bottom-right': [-12, -38]
  }}>
                    <h1>Popup</h1>
                </Popup>
            </Mapbox>
        )
    }
}