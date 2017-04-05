import {HISTORY_SHOW, HISTORY_DISSMISS} from '../constants/history'
import {ipcRenderer} from 'electron'
import {message} from 'antd'

export const showHistory = (dispatch, stat) => {
    stat.loadHistories().then(stats => {
      dispatch({
        type: HISTORY_SHOW,
        payload: stats
      })
    }).catch(e => {
      message.error(e.message)
    })
}

export const dismissHistory = (dispatch) => {
    dispatch({
        type: HISTORY_DISSMISS
    })
}
