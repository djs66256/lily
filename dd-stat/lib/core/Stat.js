
const UUID = require('uuid/v4')
const fs = require('fs')
const path = require('path')
const BaseObject = require('./BaseObject')
const FilePersistent = require('./FilePersistent')
let filePersistent = new FilePersistent()
const GitPersistent = require('./GitPersistent')

class Node {
  constructor(params = {}) {
    let {id, superNode} = params
    Object.assign(this, params)
    this.id = id || UUID().replace(/-/g, '')
    this.key = this.id
    this.superNode = superNode
  }

  getRootNode() {
    return this.superNode && this.superNode.getRootNode()
  }

  getColumns() {
    let superColumns = this.superNode && this.superNode.getColumns() || []
    return superColumns.concat(this.columns || [])
  }

  getBasedir() {
    if (this.superNode) {
      return path.join(this.superNode.getBasedir(), this.id)
    }
    else {
      return this.id
    }
  }

  getFullSourceName() {
    if (this.superNode) {
      return `${this.superNode.getFullSourceName()}/${this.name}`
    }
    else {
      return this.name || ''
    }
  }
}

class DirNode extends Node {
  constructor(params = {}) {
    let {id, superNode} = params
    super(params)
    this.isDirectory = true
  }

  findDirNodeById(id) {
    if (id && this.id === id) return this
    if (id && this.dirs && this.dirs.length) {
      for (let dir of this.dirs) {
        let subDir = dir.findDirNodeById(id)
        if (subDir) return subDir
      }
    }
    return null
  }

  async loadDirNodes() {
    if (this.dirNodesLoaded) return

    let jsons = await filePersistent.loadDirNodes(this.getBasedir())
    if (jsons && jsons.length) {
      this.dirs = jsons.map(json => new DirNode(Object.assign({superNode: this}, json)))
      for (let dirNode of this.dirs) {
        await dirNode.loadDirNodes()
      }
    }
    this.dirNodesLoaded = true
  }

  async loadStatNodes() {
    if (this.statNodesLoaded) return

    let jsons = await filePersistent.loadStatNodes(this.getBasedir())
    if (jsons && jsons.length) {
      this.stats = jsons.map(json => new StatNode(Object.assign({superNode: this}, json)))
    }
    this.statNodesLoaded = true
  }
}

class StatNode extends Node {
  constructor(params={}) {
    let {id, superNode, createTime} = params
    super(params)
    this.isDirectory = false
  }

  async save() {
    this.createTime = new Date().toISOString()
    await filePersistent.saveStat(this)

    let git = new GitPersistent(this.getRootNode().basedir)
    await git.pull()
    let message = `update ${this.name || ''} ${this.statId || ''}`
    await git.commit(message)
    await git.push()
  }

  async loadHistories() {
    let histories = await filePersistent.loadHistories(this.getBasedir())
    return histories.map(history => new StatNode(Object.assign({superNode: this.superNode}, history)))
  }

  toJsonString() {
    let cols = this.getColumns()
    let keys = cols && cols.length ? cols.map(col => col.key) : []
    let normalKeys = ['isDirectory', 'id', 'createTime', 'statId', 'pageId', 'paramId']
    return JSON.stringify(this, keys.concat(normalKeys), 4)
  }
}

class RootNode extends DirNode {
  constructor(params={}) {
    let {basedir = 'data'} = params
    super(params)
    this.basedir = basedir
  }

  getRootNode() {
    return this
  }

  getBasedir() {
    return this.basedir
  }

  async loadDirNodes() {
    let git = new GitPersistent(this.basedir)
    let log = await git.pull() || ''
    let stdout = await git.status() || ''
    if (stdout) log += stdout
    if (!stdout.match(/nothing to commit/)) {
      log += await git.push() || ''
    }
    log += await super.loadDirNodes() || ''
    return log
  }

  async enumeratStatNode({node, callback}) {
    if (!node) node = this
    if (node.isDirectory) {
      await node.loadDirNodes()
      if (node.dirs) for (let dirNode of node.dirs) {
        await this.enumeratStatNode({node: dirNode, callback})
      }
      await node.loadStatNodes()
      if (node.stats) for (let statNode of node.stats) {
        callback(statNode)
      }
    }
  }
}

module.exports = {
 DirNode, StatNode, RootNode
}
