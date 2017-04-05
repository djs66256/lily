
import {APP_INIT, APP_LOADING, APP_READY, APP_ERROR, APP_SEARCH} from '../constants/app'
import AppData from '../data'
import {remote} from 'electron'
import {RootNode} from 'dd-stat'
import {build} from '../../script/build'
const fs = require('fs')

export const reloadData = dispatch => {

}

export const beginCreating = dispatch => {

}

const basedirKey = 'basedirKey'

export const checkDataDir = dispatch => {
  let dir = AppData.get(basedirKey)
  if (fs.existsSync(dir) && dir) {
    dispatch({
      type: APP_LOADING,
      payload: {
        basedir: dir
      }
    })
  }
  else {
    dispatch({
      type: APP_INIT
    })
  }
}

export const selectDataDir = (dispatch) => {
  remote.dialog.showOpenDialog({properties:['openDirectory']}, (paths) => {
    if (paths && paths.length) {
      AppData.set(basedirKey, paths[0])
      dispatch({
        type: APP_LOADING,
        payload: {
          basedir: paths[0]
        }
      })
    }
  })
}

export const openSelection = (dispatch) => {
  dispatch({
    type: APP_SEARCH
  })
}
export const closeSelection = (dispatch) => {
  dispatch({
    type: APP_SEARCH
  })
}

export const clearDataDir = dispatch => {
  AppData.remove(basedirKey)
  dispatch({
    type: APP_READY
  })
}

var rootNode = null
export const loadRootStat = (dispatch, basedir) => {
  rootNode = new RootNode({basedir})
  rootNode.loadDirNodes().then(() => {
    dispatch({
      type: APP_READY,
      payload: {
        root: rootNode
      }
    })
  }).catch(error => {
    dispatch({
      type: APP_ERROR,
      payload: error
    })
  })
}

export const getRootNode = () => {
  return rootNode
}

const {dialog} = require('electron').remote

export const buildSourceCode = () => {
  dialog.showOpenDialog({properties: ['openDirectory']}, dirs=>{
    if (dirs.length > 0) build(rootNode, dirs[0])
  })
}
