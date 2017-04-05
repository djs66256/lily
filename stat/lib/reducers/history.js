import {HISTORY_SHOW, HISTORY_DISSMISS} from '../constants/history'

export default function (state = null, action) {
    switch (action.type) {
        case HISTORY_SHOW:
            return action.payload
            break;
        case HISTORY_DISSMISS:
            return null
            break;
        default:
    }
    return state
}
