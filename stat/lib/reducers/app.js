
import {APP_INIT, APP_READY, APP_LOADING, APP_ERROR, APP_SEARCH} from '../constants/app.js'
import {STAT_INIT, STAT_LOADING, STAT_READY} from '../constants/stat.js'
import {combineReducers} from 'redux'
import {editReducer, selectReducer} from './stat'
import current from './current'
import histories from './history'
// import {RootStat} from 'dd-stat'



const app = (state = {type:APP_INIT, root: null}, action) => {
  let newState = Object.assign({}, state)
  delete newState.error
  switch (action.type) {
  case APP_READY:
    newState.type = APP_READY
    Object.assign(newState, action.payload)
    break
  case APP_INIT:
    newState = {type: APP_INIT}
    break
  case APP_LOADING:
    newState.type = APP_LOADING
    if (action.payload && action.payload.basedir) {
      newState.basedir = action.payload.basedir
    }
    break
  case APP_ERROR:
    newState.type = APP_ERROR
    newState.error = action.payload || new Error('unknow error')
    break
  case APP_SEARCH:
    newState.type = APP_SEARCH
    break
  default:
  }
  return newState
}

const rootStat = (state, action) => {
    switch (action.type) {
        case STAT_INIT:
            return {type: action.type}
            break;
        case STAT_LOADING:
            return {type: action.type}
            break;
        case STAT_READY:
            return {type: action.type}
            break;
        default:
    }
    return state
}

console.log('combine reducer: ', app, editReducer, current, histories);
export default combineReducers({
    app,
    edit: editReducer,
    current,
    histories
})
