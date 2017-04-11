import React from '../../node_modules/react/lib/React.js';
import ReactDOM from '../../node_modules/react-dom/lib/ReactDOM.js';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEvent from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AppBar from 'material-ui/AppBar';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import FontIcon from 'material-ui/FontIcon';
import Slider from 'material-ui/Slider';


import {
    amberA700, cyan700,
    pinkA200,
    grey100, grey300, grey400, grey500, grey900,
    white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

import i18n from './translations.jsx';

let
    brandColor1 = '#e43d35',
    brandColor2 = '#333333'
;

const translations = i18n('ru');

const gfClassName = function prefix(className) {
    return 'gf-'+ className
};

const muiTheme = getMuiTheme({
    spacing: spacing,
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: fade(grey900, 0.75),
        primary2Color: cyan700,
        primary3Color: grey400,
        accent1Color: pinkA200,
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        disabledColor: fade(darkBlack, 0.3),
        pickerHeaderColor: amberA700,
        clockCircleColor: fade(darkBlack, 0.07),
        shadowColor: fullBlack,
    },
    slider: {
        selectionColor: brandColor1
    }
});

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

class GetFight extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            active: false
        }
    }

    handleDropdown(event) {
        event.preventDefault();

        this.setState({
            active: !this.state.active
        });

        return false
    }

    render() {
        return (
            <div
                className={gfClassName("logo")}
            >
                <div id="progress"><dt></dt><dd></dd></div>
                <span>getfight</span>
                <ul
                    className={gfClassName("menu"+ (this.state.active ? " active": ""))}
                    onClick={this.handleDropdown.bind(this)}
                    role="navigation"
                >
                    {translations.HEADER.map((item, i) =>
                        <li>
                            <a role="link" href={item.route} tabIndex={i} key={i}>
                                {item.label}
                            </a>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
};

class ActionBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showFilterWindow: false,
            editBoxState: false,
            selectedWeight: 4,
            selectedHeight: 170
        }
    }

    searchFilter(event) {

        let
            button = event.target,
            showFilterWindow = !this.state.showFilterWindow,
            editBoxState = true
        ;

        this.setState({
            showFilterWindow,
            editBoxState
        });
    }

    hideEditBox(event) {

        let
            editBoxState = false
            ;

        this.setState({
            editBoxState
        });
    }

    changeWeight(event, value) {

        let
            selectedWeight = value
        ;

        this.setState({
            selectedWeight
        })
    }

    changeHeight(event, value) {

        console.log('Event: %o, Value: %o', event, value);

        let
            selectedHeight = value
            ;

        this.setState({
            selectedHeight
        })
    }

    height2Feet() {

    }

    render() {

        let
            sliderStyle = {
                height: 160,
                margin: 0
            },
            minHeight = 145,
            maxHeight = 220;

        return (
            <aside className={gfClassName("actionbar")}>
                <aside className={gfClassName("toolbar")}>
                    <header className={gfClassName("toolbar__header")}>
                        <span className="material-icons left-act">search</span>
                        <input
                            type="text"
                            placeholder={translations.LABELS.SEARCH_PLACEHOLDER}
                        />
                        <span
                            className="material-icons right-act"
                            onClick={this.searchFilter.bind(this)}
                        >settings</span>
                    </header>
                    <section className={gfClassName("toolbar__toggle")}>
                        <div>
                            <input id="search-by-fighter" name="search_by" type="radio"/>
                            <label htmlFor="search-by-fighter">
                                <span className="material-icons">person_outline</span>
                                <span>{translations.LABELS.SEARCH_BY_FIGHTER}</span>
                            </label>
                        </div>
                        <div>
                            <input id="search-by-gym" name="search_by" type="radio"/>
                            <label htmlFor="search-by-gym">
                                <span className="material-icons">pin_drop</span>
                                <span>{translations.LABELS.SEARCH_BY_GYM}</span>
                            </label>
                        </div>
                    </section>
                    <section className={gfClassName("toolbar__list")}>
                        <ul>
                            <li>
                                <div className="list__preview">
                                    <img src="https://pbs.twimg.com/profile_images/770451855369465856/gxxut0bM.jpg" />
                                </div>
                                <div className="list__description">
                                    <mark className="description__fullname">
                                        Firstname Lastname
                                    </mark>
                                    <div className="description__state">
                                        WW-LL-DD<div className="state-pfp"></div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </section>
                </aside>
                <aside className={gfClassName("editbox"+ (this.state.editBoxState ? " active" : ""))}>
                    <header className={gfClassName("editbox__header")}>
                        <span
                            className="material-icons left-act"
                            onClick={this.hideEditBox.bind(this)}
                        >settings</span>
                        <h2>{translations.LABELS.EDITBOX_HEADER}</h2>
                        <span
                            className="material-icons right-act"
                            onClick={this.hideEditBox.bind(this)}
                        >close</span>
                    </header>
                    <section className={gfClassName("editbox__conditions")}>
                        <div className="conditions__weight">
                            <h3>{translations.LABELS.CONDITIONS.WEIGHT}</h3>
                            <Slider
                                className="conditional--slider"
                                sliderStyle={sliderStyle}
                                axis="y-reverse"
                                value={this.state.selectedWeight}
                                step={1}
                                min={0}
                                max={8}
                                onChange={this.changeWeight.bind(this)}
                            />
                            <ul
                                className="cond-weight__weightList"
                            >
                                {translations.LABELS.CONDITIONS.WEIGHT_LIST.map((item, i) =>
                                    <li
                                        className={i == this.state.selectedWeight ? "active" : ""}
                                        key={i}
                                        onClick={this.changeWeight.bind(this, null, i)}
                                    >
                                        {item}
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div className="conditions__height">
                            <h3>{translations.LABELS.CONDITIONS.HEIGHT}</h3>
                            <Slider
                                className="conditional--slider"
                                sliderStyle={sliderStyle}
                                axis="y"
                                value={this.state.selectedHeight}
                                step={1}
                                min={minHeight}
                                max={maxHeight}
                                onChange={this.changeHeight.bind(this)}
                            />
                            <div
                                className="cond-height__heightOption"
                            >
                                <span className="heightOption--max">
                                    <u>{maxHeight}</u>
                                    <b>{this.height2Feet(maxHeight)}</b>
                                </span>
                                <div className="heightOption--current">
                                    <input
                                        className="height--centi"
                                        type="text"
                                        value={this.state.selectedHeight}
                                        onChange={this.changeHeight.bind(this)}
                                    />
                                    <input
                                        className="height--feet"
                                        type="text"
                                        value={this.height2Feet(this.state.selectedHeight)}
                                        onChange={this.changeHeight.bind(this)}
                                    />
                                </div>
                                <span className="heightOption--min">
                                    <u>{minHeight}</u>
                                    <b>{this.height2Feet(minHeight)}</b>
                                </span>
                            </div>
                        </div>
                    </section>
                </aside>
            </aside>
        )
    }

};

const Navigation = () => (
    <div id={gfClassName("navigation")} className={gfClassName("navigation")}></div>
);

class Template extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            logged: false
        };
    }

    handleTouchTap(event) {
        // This prevents ghost click.
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

injectTapEvent();

const App = React.createClass({
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Template />
            </MuiThemeProvider>
        )
    }
});

const Appy = React.createClass({
    render() {
        let
            data = this.props.data,
            arry
            ;

        arry = !!data && data.length
            ? data.map((v, i) => {
                return <Item key={i} index={i} val={v} />;
            })
            : <div>nothing</div>;

        console.log(arry);

        return (
            <div>
                {arry}
            </div>
        )
    }
});

let Item = React.createClass({
    render() {
        let data = this.props
            ;

        return data.val
            ? <div>Element: ${data.index} is <b>${data.val}</b></div>
            : <div>Empty</div>;
    }
});

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

/*
 Привет,
 Мы с одного этажа, но не было возможности пообщаться в непринужденной обстановке, поэтому решил написать тут.
 */