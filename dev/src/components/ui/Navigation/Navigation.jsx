import React, {PropTypes} from 'react';

import {
    i18n,
    ui,
    colors,
    gfClassName
} from '../../helper';

const translations = i18n('ru');

export default class Navigation extends React.Component {
    render() {
        return (
            <div
                id={gfClassName("navigation")}
                className={gfClassName("navigation")}
            ></div>
        )
    }
}