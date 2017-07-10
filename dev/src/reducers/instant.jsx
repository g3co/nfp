import {
    SET_INSTANT_INIT
} from '../constants.jsx';

const initialState = {
    header: {
        leftCTA: '',
        title: '',
        rightCTA: ''
    },
    content: null
};

export default function instant(state = initialState, action) {
    switch(action.type) {
        case SET_INSTANT_INIT:

            if(!!action.payload == false) {
                return initialState
            }

            let header = action.payload.header || [],
                content = action.payload.content || null,
                _header = {
                    title: header[0]
                };

            if(header.length >= 2) {
                _header.leftCTA = header[0];
                _header.title = header[1];
                _header.rightCTA = header[2];
            }

            return {...state,
                header: _header,
                content: content
            };
            break;
        default:
            return state;
            break;
    }
}