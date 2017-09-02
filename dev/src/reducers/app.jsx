import {
    SET_APP_PROGRESS,
    SET_APP_NOTIFICATION,
    SET_APP_MAPMODE,
    SET_APP_TRAININGMODE
} from '../constants.jsx';

const initialState = {
    progress: 0,
    notification: {
        type: '',
        text: ''
    },
    mapMode: false,
    trainingMode: false
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
        case SET_APP_MAPMODE:

            return {...state,
                mapMode: action.payload,
                trainingMode: false
            };

            break;
        case SET_APP_TRAININGMODE:

            return {...state,
                mapMode: false,
                trainingMode: action.payload
            };

            break;
        default:
            return state;
            break;
    }
}