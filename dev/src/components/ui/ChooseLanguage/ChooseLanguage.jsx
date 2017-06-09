import React from 'react';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import { gfClassName } from '../../helper';

export default class ChooseLanguage extends React.Component {

    constructor(props) {
        super(props);

        this.handleOpenPopover = this.handleOpenPopover.bind(this);
        this.handleClosePopover = this.handleClosePopover.bind(this);
        this.handleLanguageSelector = this.handleLanguageSelector.bind(this);

        this.state = {
            open: false,
            language: 'ru'
        }
    }

    handleOpenPopover(event) {
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget
        });
    }

    handleClosePopover() {
        this.setState({
            open: false
        });
    }

    handleLanguageSelector(e, val) {
        e.preventDefault();

        if(val == this.state.language) {
            this.setState({
                open: false
            });
            
            return
        }

        this.setState({
            language: val,
            open: false
        });

        this.props.setTranslation(val);

        return false
    }

    getIcon(l) {
        switch(l) {
            case 'ru':
                return (<svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                >
                    <g
                        fillRule="evenodd"
                        strokeWidth="1pt"
                    >
                        <path
                            fill="#fff"
                            d="M0 0h512.005v512H0z"
                        />
                        <path
                            fill="#0039a6"
                            d="M0 170.667h512.005V512H0z"
                        />
                        <path
                            fill="#d52b1e"
                            d="M0 341.333h512.005V512H0z"
                        />
                    </g>
                </svg>);
                break;
            case 'en':
                return (<svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                >
                    <defs>
                        <clipPath
                            id="a">
                            <path
                                fillOpacity=".67"
                                d="M250 0h500v500H250z"
                            />
                        </clipPath>
                    </defs>
                    <g
                        clipPath="url(#a)"
                        transform="translate(-256) scale(1.024)"
                    >
                        <g
                            strokeWidth="1pt">
                            <path
                                fill="#006"
                                d="M0 0h1000.02v500.01H0z"
                            />
                            <path
                                d="M0 0v55.903l888.218 444.11h111.802V444.11L111.802.003H0zm1000.02 0v55.9L111.802 500.01H0v-55.9L888.218 0h111.802z"
                                fill="#fff"
                            />
                            <path
                                d="M416.675 0v500.01h166.67V0h-166.67zM0 166.67v166.67h1000.02V166.67H0z"
                                fill="#fff"
                            />
                            <path
                                d="M0 200.004v100.002h1000.02V200.004H0zM450.01 0v500.01h100V0h-100zM0 500.01l333.34-166.67h74.535L74.535 500.01H0zM0 0l333.34 166.67h-74.535L0 37.27V0zm592.145 166.67L925.485 0h74.535L666.68 166.67h-74.535zm407.875 333.34L666.68 333.34h74.535l258.805 129.403v37.267z"
                                fill="#c00"
                            />
                        </g>
                    </g>
                </svg>);
                break;
        }
    }

    render() {
        return (
            <div
                className={gfClassName("language-selector")}
                onClick={this.handleOpenPopover}
            >
                {this.getIcon(this.state.language)}
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    onRequestClose={this.handleClosePopover}
                    animation={PopoverAnimationVertical}
                >
                    <Menu
                        onChange={this.handleLanguageSelector}
                    >
                        <MenuItem
                            value="ru"
                            primaryText="Русский"
                        />
                        <MenuItem
                            value="en"
                            primaryText="English"
                        />
                    </Menu>
                </Popover>
            </div>
        )
    }
}