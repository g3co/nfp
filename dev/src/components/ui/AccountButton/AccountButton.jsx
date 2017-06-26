import React from 'react';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import { gfClassName } from '../../helper';

export default class AccountButton extends React.Component {

    constructor(props) {
        super(props);

        this.handleOpenPopover = this.handleOpenPopover.bind(this);
        this.handleClosePopover = this.handleClosePopover.bind(this);

        this.state = {
            open: false
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

    render(props) {

        props = {...this.props};

        return (
            <button
                className={gfClassName("action__account")}
                type="button"
                onClick={this.handleOpenPopover}
            >
                <span><img
                    src={props.user.account.avatar}
                /></span>
                <i
                    className={props.user.schedule.length ? "active" : ""}
                >{props.user.schedule.length}</i>
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    animation={PopoverAnimationVertical}
                    onRequestClose={this.handleClosePopover}
                    useLayerForClickAway={true}
                >
                    <Menu
                        onChange={this.handleClosePopover}
                    >
                        <MenuItem
                            value="user_profile"
                            primaryText={props.translations.LABELS.USER_PROFILE}
                        />
                        <MenuItem
                            value="user_schedule"
                            primaryText={props.translations.LABELS.USER_SCHEDULE}
                        />
                        <MenuItem
                            value="user_settings"
                            primaryText={props.translations.LABELS.USER_SETTINGS}
                        />
                        <MenuItem
                            value="log_out"
                            primaryText={props.translations.LABELS.LOG_OUT}
                        />
                    </Menu>
                </Popover>
            </button>
        )
    }
}