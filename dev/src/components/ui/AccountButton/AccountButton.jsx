import React from 'react';
import { findDOMNode } from 'react-dom';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import * as userActions from '../../../actions/user.jsx';

import { gfClassName } from '../../helper';

class AccountButton extends React.Component {

    constructor(props) {
        super(props);

        this.handleOpenPopover = this.handleOpenPopover.bind(this);
        this.handleClosePopover = this.handleClosePopover.bind(this);
        this.userLogout = this.userLogout.bind(this);

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

    userLogout() {
        let props = {...this.props},
            logoutUser = props.userActions.setUserAccount;

        $dw(findDOMNode(this))
            .request('/api/v1/logout')
            .then(logoutUser)
    }

    render(props) {

        props = {...this.props};

        let translations = props.translations,
            account = props.user.account || {},
            schedule = props.user.schedule || [],
            handleOpenPopover = this.handleOpenPopover,
            handleClosePopover = this.handleClosePopover,
            userLogout = this.userLogout,
            open = this.state.open,
            anchorEl = this.state.anchorEl;

        return (
            <button
                className={gfClassName("action__account")}
                type="button"
                onClick={handleOpenPopover}
            >
                <span><img
                    src={account.avatar}
                /></span>
                <i
                    className={schedule.length ? "active" : ""}
                >{schedule.length}</i>
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{horizontal: "left", vertical: "bottom"}}
                    targetOrigin={{horizontal: "left", vertical: "top"}}
                    animation={PopoverAnimationVertical}
                    onRequestClose={handleClosePopover}
                    useLayerForClickAway={true}
                >
                    <Menu
                        onChange={handleClosePopover}
                    >
                        <MenuItem
                            value="user_profile"
                            primaryText={translations.LABELS.USER_PROFILE}
                        />
                        <MenuItem
                            value="user_schedule"
                            primaryText={translations.LABELS.USER_SCHEDULE}
                        />
                        <MenuItem
                            value="user_settings"
                            primaryText={translations.LABELS.USER_SETTINGS}
                        />
                        <MenuItem
                            value="log_out"
                            primaryText={translations.LABELS.LOG_OUT}
                            onClick={userLogout}
                        />
                    </Menu>
                </Popover>
            </button>
        )
    }
}

export default connect(state => {return {
    user: state.user
}}, dispatch => {return {
    userActions: bindActionCreators(userActions, dispatch)
}})(AccountButton);