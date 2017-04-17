import React, {PropTypes} from 'react';

import AppBar from 'material-ui/AppBar';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import FontIcon from 'material-ui/FontIcon';
import Slider from 'material-ui/Slider';

import * as helper from '../helper';

const {
    i18n,
    ui,
    colors,
    gfClassName
} = helper;

const {
    ActionBar,
    GetFight,
    Navigation
} = ui;

const translations = i18n('ru');

export default class Template extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            logged: false
        };
    }

    handleTouchTap(event) {
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose() {
        this.setState({
            open: false,
        });
    };

    toggleClassName(e, _className) {
        let
            el = e.target,
            className = el.className
            ;

        if(!!className && !!~className.indexOf(_className)) {
            el.className = className.replace(_className, '')
        } else {
            el.className += ' '+ _className
        }
    }

    render() {

        const LoginButton = (props) => (
            <button
                {...props}
                className={gfClassName("action__login")}
                type="button"
            >
                <FontIcon
                    className="material-icons"
                    color="#fff"
                    style={{
                        fontSize: '2em'
                    }}
                >person</FontIcon>
                <span>{translations.LABELS.LOG_IN}</span>
            </button>
        );

        const LoggedButton = (props) => (
            <IconMenu
                {...props}
                iconButtonElement={
                    <FontIcon>person</FontIcon>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
                <MenuItem primaryText="Refresh" />
                <MenuItem primaryText="Help" />
                <MenuItem primaryText="Sign out" />
            </IconMenu>
        );

        return (
            <div>
                <AppBar
                    className={gfClassName("appbar")}
                    style={{
                        padding: '0 16px'
                    }}
                    title={<GetFight />}
                    iconElementRight={this.state.logged ? <LoggedButton /> : <LoginButton />}
                    showMenuIconButton={false}
                    onLeftIconButtonTouchTap={this.handleTouchTap.bind(this)}
                    titleStyle={{
                        fontSize: 'inherit'
                    }}
                />
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose.bind(this)}
                >
                    <Menu>
                        <MenuItem primaryText="Refresh" />
                        <MenuItem primaryText="Help &amp; feedback" />
                        <MenuItem primaryText="Settings" />
                        <MenuItem primaryText="Sign out" />
                    </Menu>
                </Popover>
                <ActionBar />
                <Navigation />
            </div>
        );
    }

    componentDidMount() {
        setTimeout(() => {

            initMap();

            if('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    initMap(position);

                    //google.maps.event.addDomListener(window, 'load', initMap);
                });
            } else {
                alert('To continue, please, get access to your geo location.')
            }

            function initMap(position) {

                var coords = !!position ? position.coords : {latitude: -28.024, longitude: 140.887};

                var locations = [
                    {lat: -31.563910, lng: 147.154312},
                    {lat: -33.718234, lng: 150.363181},
                    {lat: -33.727111, lng: 150.371124},
                    {lat: -33.848588, lng: 151.209834},
                    {lat: -33.851702, lng: 151.216968},
                    {lat: -34.671264, lng: 150.863657},
                    {lat: -35.304724, lng: 148.662905},
                    {lat: -36.817685, lng: 175.699196},
                    {lat: -36.828611, lng: 175.790222},
                    {lat: -37.750000, lng: 145.116667},
                    {lat: -37.759859, lng: 145.128708},
                    {lat: -37.765015, lng: 145.133858},
                    {lat: -37.770104, lng: 145.143299},
                    {lat: -37.773700, lng: 145.145187},
                    {lat: -37.774785, lng: 145.137978},
                    {lat: -37.819616, lng: 144.968119},
                    {lat: -38.330766, lng: 144.695692},
                    {lat: -39.927193, lng: 175.053218},
                    {lat: -41.330162, lng: 174.865694},
                    {lat: -42.734358, lng: 147.439506},
                    {lat: -42.734358, lng: 147.501315},
                    {lat: -42.735258, lng: 147.438000},
                    {lat: -43.999792, lng: 170.463352}
                ];

                var grayscaleMap = new google.maps.StyledMapType(
                    [
                        {
                            "featureType": "all",
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "saturation": 72
                                },
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 80
                                }
                            ]
                        },
                        {
                            "featureType": "all",
                            "elementType": "labels.text.stroke",
                            "stylers": [
                                {
                                    "visibility": "on"
                                },
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 16
                                }
                            ]
                        },
                        {
                            "featureType": "all",
                            "elementType": "labels.icon",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "administrative",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 20
                                }
                            ]
                        },
                        {
                            "featureType": "administrative",
                            "elementType": "geometry.stroke",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 17
                                },
                                {
                                    "weight": 1.2
                                }
                            ]
                        },
                        {
                            "featureType": "landscape",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 20
                                }
                            ]
                        },
                        {
                            "featureType": "poi",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 21
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 17
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "geometry.stroke",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 29
                                },
                                {
                                    "weight": 0.2
                                }
                            ]
                        },
                        {
                            "featureType": "road.arterial",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 18
                                }
                            ]
                        },
                        {
                            "featureType": "road.local",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 16
                                }
                            ]
                        },
                        {
                            "featureType": "transit",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 19
                                }
                            ]
                        },
                        {
                            "featureType": "water",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 17
                                }
                            ]
                        }
                    ],
                    {
                        name: 'grayscale Map'
                    }
                );

                var map = new google.maps.Map(document.getElementById('gf-navigation'), {
                    zoom: 14,
                    center: {
                        lat: coords.latitude,
                        lng: coords.longitude
                    },
                    zoomControl: false,
                    streetViewControl: false,
                    mapTypeControlOptions: {
                        mapTypeIds: []
                    }
                });

                map.mapTypes.set('grayscaleMap', grayscaleMap);
                map.setMapTypeId('grayscaleMap');

                // Create an array of alphabetical characters used to label the markers.
                var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

                // Add some markers to the map.
                // Note: The code uses the JavaScript Array.prototype.map() method to
                // create an array of markers based on a given "locations" array.
                // The map() method here has nothing to do with the Google Maps API.
                var markers = locations.map(function(location, i) {
                    return new google.maps.Marker({
                        position: location,
                        label: labels[i % labels.length]
                    });
                });

                // Add a marker clusterer to manage the markers.
                var markerCluster = new MarkerClusterer(map, markers,
                    {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
            }
        }, 1000);
    }
}