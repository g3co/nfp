import {
    SET_APP_PROGRESS,
    SET_APP_NOTIFICATION
} from '../constants.jsx';

const initialState = {
    progress: 0,
    notification: {
        type: '',
        text: ''
    }
};

export default function app(state = initialState, action) {
    switch(action.type) {
        case SET_APP_PROGRESS:
            return {...state,
                progress: action.payload
            };
            break;
        case SET_APP_NOTIFICATION:

            let notification = action.payload;

            if(!!notification == false) {
                return {...state,
                    notification: initialState.notification
                }
            }

            return {...state,
                notification: {
                    type: notification.type,
                    text: notification.text
                }
            };
            break;
        default:
            return state;
            break;
    }
}