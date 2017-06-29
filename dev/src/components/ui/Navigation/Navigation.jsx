import React from 'react';
import Map from '../Map';
import {
    gfClassName
} from '../../helper';

let _interval;

export default class Navigation extends React.Component {

    constructor(props) {
        super(props);

        this.updateCurrentPosition = this.updateCurrentPosition.bind(this);

        this.state = {
            currentPosition: [-28.024, 40.887],
            currentAdv: {}
        };

        if('geolocation' in navigator) {
            _interval = setInterval(this.updateCurrentPosition, 3000);
        } else {
            alert('To continue, please, get access to your geo location.');
        }
    }

    updateCurrentPosition() {
        navigator.geolocation.getCurrentPosition(function(position) {

            if(!!position && !!position.coords) {
                let currentPosition = [position.coords.longitude, position.coords.latitude],
                    currentAdv,
                    lngDiff = Math.abs(this.state.currentPosition[0] - currentPosition[0]),
                    latDiff = Math.abs(this.state.currentPosition[1] - currentPosition[1]);

                delete position.coords.longitude;
                delete position.coords.latitude;

                currentAdv = position.coords;

                if((isNaN(lngDiff) || isNaN(latDiff)) || (lngDiff < 5 && latDiff < 5)) {
                    return
                }

                this.setState({
                    currentPosition,
                    currentAdv
                });

                return
            }

            clearInterval(_interval)
        }.bind(this))
    }

    render() {
        return (
            <div
                id={gfClassName("navigation")}
                className={gfClassName("navigation")}
            >
                <Map
                    currentPosition={this.state.currentPosition}
                />
            </div>
        )
    }
}