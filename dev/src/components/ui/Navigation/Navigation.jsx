import React, {PropTypes} from 'react';

import {
    ui,
    colors,
    gfClassName
} from '../../helper';

export default class Navigation extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div
                id={gfClassName("navigation")}
                className={gfClassName("navigation")}
            ></div>
        )
    }
}