import React from 'react';
import ReactMapboxGl,
{
    Layer,
    Feature,
    Marker
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

        let currentPosition = props.currentPosition;
        
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
                    className={gfClassName("geo--tracker")}
                    coordinates={currentPosition}
                    anchor="bottom"
                >
                    <i>&nbsp;</i>
                </Marker>
            </Mapbox>
        )
    }
}