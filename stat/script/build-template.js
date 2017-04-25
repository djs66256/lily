const fs = require('fs')
const path = require('path')

class Build {
  constructor({node, basedir}) {
    this.node = node
    this.basedir = basedir
  }

  async build() {
    await this.buildFromNode(this.node)
    this.buildFinish()
  }

  async buildFromNode(node) {
    await node.loadStatNodes()
    if (node.stats) for (let stat of node.stats) {
      this.appendStat(stat)
    }
    if (node.dirs) for (let dir of node.dirs) {
      await this.buildFromNode(dir)
    }
  }

  appendStat(stat) {
    console.log('stat: ', stat)
  }

  buildFinish() {

  }
}

class BuildEventIOS extends Build {
  constructor(p) {
    super(p)
    let hfile = path.join(this.basedir, 'MZClickEvent.h')
    let mfile = path.join(this.basedir, 'MZClickEvent.m')
    this.fileH = fs.createWriteStream(hfile)
    this.fileM = fs.createWriteStream(mfile)
  }

  build() {
    this.eventMap = {}
    super.build()
  }

  appendStat(stat) {
    let statObj = this.eventMap[stat.statId]
    if (!statObj) {
      statObj = []
      this.eventMap[stat.statId] = statObj
    }
    statObj.push(stat)
  }

  writeStats() {
    let com = `/*
Total ${Object.keys(this.eventMap).length} events
Create by Lily, ${new Date().toISOString()}
*/
`
    this.fileH.write(com)
    this.fileM.write(com)
    Object.keys(this.eventMap).forEach(key => {
      let stats = this.eventMap[key]
      if (stats.length == 0) return
      let comments = stats.map(stat => {
        let params = []
        if (stat.params) for (let p of stat.params) {
          params.push(`${p.paramId}(${p.name})`)
        }
        return `
/*
Name: ${stat.name}
Params: ${params.join(', ')}
Description: ${stat.description || ''}
Source: ${stat.getFullSourceName()}
Version: ${stat.version_iOS}
*/`}).join('')

      let stat = stats[0]
      let statStringH = `
${comments}
FOUNDATION_EXTERN NSString * MZTrackEventId_${stat.statId};
`
      let statStringM = `
${comments}
NSString * MZTrackEventId_${stat.statId} = @"${stat.statId}";
`
      console.log('stat: ', statStringH, statStringM);
      this.fileH.write(statStringH)
      this.fileM.write(statStringM)
    })
  }

  buildFinish() {
    this.writeStats()
    this.fileM.end()
    this.fileH.end()
  }
}

class BuildPageIOS extends Build {
  constructor(p) {
    super(p)
    let hfile = path.join(this.basedir, 'MZPageEvent.h')
    let mfile = path.join(this.basedir, 'MZPageEvent.m')
    this.fileH = fs.createWriteStream(hfile)
    this.fileM = fs.createWriteStream(mfile)
  }

  appendStat(stat) {
    let source = stat.getFullSourceName()
    let comments = `
/*
Name: ${stat.name}
Source: ${source}
Version: ${stat.version_iOS}
*/`
    let statStringH = `
${comments}
FOUNDATION_EXTERN NSString * MZTrackPage_${stat.pageId};
`

    let statStringM = `
${comments}
NSString * MZTrackPage_${stat.pageId} = @"${stat.pageId}";
`
    console.log('page: ', statStringH, statStringM);
    this.fileH.write(statStringH)
    this.fileM.write(statStringM)
  }

  buildFinish() {
    this.fileM.end()
    this.fileH.end()
  }
}

export {BuildEventIOS, BuildPageIOS, Build}
