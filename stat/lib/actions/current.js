
import {CURRENT_SELECT_DIR, CURRENT_SELECT_STAT,
    CURRENT_DESELECT_DIR, CURRENT_DESELECT_STAT} from '../constants/current'

export const selectDir = (dispatch, dir) => {
  dir.loadStatNodes().then(() => {
    dispatch({
      type: CURRENT_SELECT_DIR,
      payload: dir
    })
  })
}

export const selectStat = (dispatch, stat) => {
    let type = stat.isDirectory ? CURRENT_SELECT_DIR : CURRENT_SELECT_STAT
    dispatch({
        type: type,
        payload: stat
    })
}

export const deselectDir = (dispatch, stat) => {
  dispatch({
    type: CURRENT_DESELECT_DIR,
    payload: stat
  })
}

export const deselectStat = (dispatch, stat) => {
    let type = stat.isDirectory ? CURRENT_DESELECT_DIR : CURRENT_DESELECT_STAT
    dispatch({
        type: type,
        payload: stat
    })
}
