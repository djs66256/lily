import {remote} from 'electron'
import {RootNode, StatNode, DirNode} from 'dd-stat'
import {build} from '../script/build'
const fs = require('fs')
import LocalData from './local-data'
const {dialog} = require('electron').remote
import EventEmitter from 'events'

const basedirKey = 'basedirKey'

const getDataDir = () => {
  let dir = LocalData.get(basedirKey)
  if (dir && fs.existsSync(dir)) {
    return dir
  }
  else {
    return null
  }
}

const selectDataDir = () => {
  return new Promise((resovle, reject) => {
    dialog.showOpenDialog({properties:['openDirectory']}, (paths) => {
      if (paths && paths.length) {
        LocalData.set(basedirKey, paths[0])
        resovle(paths[0])
      }
      else {
        reject()
      }
    })
  })
}

const clearDataDir = () => {
  LocalData.remove(basedirKey)
}

var rootNode = null
const loadRootStat = (basedir) => {
  rootNode = new RootNode({basedir})
  return rootNode.loadDirNodes()
}

const getRootNode = () => {
  return rootNode
}

const buildSourceCode = () => {
  dialog.showOpenDialog({properties: ['openDirectory']}, dirs=>{
    if (dirs.length > 0) build(rootNode, dirs[0])
  })
}

const saveStat = async (stat, dir) => {
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
  manager.emit('changed')
}

let manager = new EventEmitter()

export {
  manager,
  getDataDir,
  selectDataDir,
  clearDataDir,
  loadRootStat,
  getRootNode,
  buildSourceCode,
  saveStat
}
