
import {CURRENT_SELECT_DIR, CURRENT_SELECT_STAT,
    CURRENT_DESELECT_DIR, CURRENT_DESELECT_STAT} from '../constants/current'

export default (state={stat:null, dir:null}, action) => {
    let newState = Object.assign({}, state)
    switch (action.type) {
        case CURRENT_SELECT_DIR: {
            // let stat = Object.assign({}, action.payload)
            // stat.childStats = stat.childStats && stat.childStats.concat()
            newState.dir = action.payload
        }
            break;
        case CURRENT_SELECT_STAT: {
            // let stat = Object.assign({}, action.payload)
            // stat.childStats = stat.childStats && stat.childStats.concat()
            newState.stat = action.payload
        }
            break;
        case CURRENT_DESELECT_STAT:
            newState.stat = null
            break
        case CURRENT_DESELECT_DIR:
            newState.dir = null
            break
        default:
    }
    return newState
}
