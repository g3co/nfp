import React from 'react';

import {
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