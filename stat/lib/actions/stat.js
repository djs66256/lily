
import {STAT_SELECTED_INIT, STAT_SELECTED_LOADING, STAT_SELECTED_READY} from '../constants/stat'
import {STAT_CREATE, STAT_EDIT, STAT_DELETE, STAT_END_EDITING, STAT_ITEM_SELECTED, STAT_DIR_SELECTED, STAT_SAVE, STAT_EDIT_ERROR} from '../constants/stat'
import {APP_INIT, APP_LOADING, APP_READY, APP_CREATING} from '../constants/app'
import {ipcRenderer} from 'electron'
import {beginCreating} from './app'
import {StatNode} from 'dd-stat'

// export const loadStat = dispatch => {
//     dispatch({
//         type: APP_LOADING
//     })
//     rootStat.loadAllChildStats().then(()=> {
//         dispatch({
//             type: APP_READY,
//             payload: rootStat
//         })
//     }).catch(e => {
//         console.log('ERROR', e);
//     })
// }

export const createStat = (dispatch, isDirectory = true, superNode) => {
    dispatch({
        type: STAT_EDIT,
        payload: {isDirectory, superNode}
    })
    beginCreating(dispatch)
}

export const deleteStat = (dispatch, stat) => {
    stat.deleted = true
    saveStat(dispatch, stat)
}

export const editStat = (dispatch, stat) => {
    dispatch({
        type: STAT_EDIT,
        payload: stat
    })
    beginCreating(dispatch)
}

// export const selectStat = (dispatch, stat) => {
//     let type = STAT_ITEM_SELECTED
//     if (stat.isDrectory) {
//         type = STAT_DIR_SELECTED
//     }
//     dispatch({
//         type: type,
//         payload: stat
//     })
//     dispatch({
//         type: APP_READY
//     })
// }

export const saveStat = async (dispatch, stat, dir) => {
  dispatch({
    type: STAT_SAVE,
    payload: stat
  })
  let statObj = null
  let created = true
  if (stat.id && dir && dir.stats) for (let item of dir.stats) {
    if (item.id === stat.id) {
      Object.assign(item, stat)
      statObj = item
      created = false
      break
    }
  }
  if (!statObj) statObj = new StatNode(Object.assign({superNode:dir}, stat))
  await statObj.save()
  if (created) {
    dir.stats = dir.stats && dir.stats.length ? [statObj].concat(dir.stats) : [statObj]
  }
  else {
    dir.stats = dir.stats.concat([])
  }
  dispatch({
    type: STAT_END_EDITING
  })
}

export const cancel = dispatch => {
    dispatch({
        type: STAT_END_EDITING
    })
}
