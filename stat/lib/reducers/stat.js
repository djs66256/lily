import {STAT_CREATE, STAT_EDIT, STAT_DELETE, STAT_END_EDITING,
STAT_DIR_SELECTED, STAT_ITEM_SELECTED} from '../constants/stat'
import {Stat} from 'dd-stat'

export const editReducer = (state={creating: false, stat:null}, action) => {
    switch (action.type) {
        case STAT_CREATE:
            return {
                stat: { }
            }
            break;
        case STAT_EDIT:
            return {
                stat: action.payload
            }
            break;
        case STAT_END_EDITING:
            return {}
            break
        default:
            return state
    }
}

export const selectReducer = (state={dir: null, stat: null}, action) => {
    let ret =  Object.assign(state, {})
    switch (action.type) {
        case STAT_DIR_SELECTED:
            ret.dir = action.payload
            break
        case STAT_ITEM_SELECTED:
            ret.stat = action.payload
            break
        default:
    }
    return state
}
