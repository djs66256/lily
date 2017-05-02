
// import {BuildEventIOS, BuildPageIOS, Build} from './build-template'

// export async function build(rootNode, basedir) {
//   if (!rootNode) throw new Error('rootNode can not be null')
//   let _ = await rootNode.loadDirNodes()
//   for (let dirNode of rootNode.dirs) {
//     if (dirNode.id === 'page') {
//       let builder = new BuildPageIOS({node: dirNode, basedir})
//       await builder.build()
//     }
//     else if (dirNode.id === 'event') {
//       let builder = new BuildEventIOS({node: dirNode, basedir})
//       await builder.build()
//     }
//     else {
//
//     }
//   }
// }

import path from 'path'
import fs from 'fs'
import {remote} from 'electron'
const EJS = require('ejs')

async function loadAllNode(node) {
  await node.loadStatNodes()
  if (node.dirs) for (let dir of node.dirs) {
    await loadAllNode(dir)
  }
}

function getStatsFromNode(node) {
  let nodes = node.stats || []
  if (node.dirs) for (let dir of node.dirs) {
    let subnodes = getStatsFromNode(dir)
    nodes = nodes.concat(subnodes)
  }
  return nodes
}

function packStats(nodes) {
  let nodesMap = {}
  for (let node of nodes) {
    if (!nodesMap[node.statId]) nodesMap[node.statId] = []
    nodesMap[node.statId].push(node)
  }
  return Object.keys(nodesMap).map(key => {
    let nodes = nodesMap[key]
    return {statId:key, value:nodes}
  })
}

function sortStats(nodes) {
  return nodes.sort((a,b) => a.statId < b.statId)
}

function generateStatsFromNode(node) {
  let nodes = getStatsFromNode(node)
  nodes = packStats(nodes)
  nodes = sortStats(nodes)
  return nodes
}

function getConfigBasePath() {
  function getConfigBasePathDistribution(distribution) {
    const resourcesPath = distribution ? remote.process.resourcesPath : remote.process.cwd()
    const buildBasedir = path.join(resourcesPath, 'app', 'dist', 'assets')
    return buildBasedir
  }
  let buildBasedir = getConfigBasePathDistribution(true)
  if (fs.existsSync(path.join(buildBasedir, 'build.json'))) {
    return buildBasedir
  }
  else {
    return getConfigBasePathDistribution(false)
  }
}

export async function build(rootNode, basedir) {
  const buildBasedir = getConfigBasePath()
  const configPath = path.join(buildBasedir, 'build.json')
  const jsonData = fs.readFileSync(configPath)
  const config = JSON.parse(jsonData)

  await loadAllNode(rootNode)

  let ejsNode = {}
  for (let node of rootNode.dirs) {
    if (node.id == 'event') {
      ejsNode.event = generateStatsFromNode(node)
    }
    else {
      ejsNode[node.id] = sortStats(getStatsFromNode(node))
    }
  }

  for (let buildConf of config.config) {
    let platform = buildConf.platform
    let platformDir = path.join(basedir, platform)
    if (!fs.existsSync(platformDir)) {
      fs.mkdir(platformDir)
    }

    if (buildConf.scripts) for (let script of buildConf.scripts) {
      // let ejs = EJS.renderFile(path.join(buildBasedir, script.template), {data:'aaa'}, {cache: false, debug: true})
      let templateString = fs.readFileSync(path.join(buildBasedir, script.template)).toString()
      let renderedString = EJS.render(templateString, ejsNode, {cache: false})
      fs.writeFileSync(path.join(platformDir, script.output), renderedString)
      console.log(`Finish build ${platform} ${script.template}`)
    }
  }
}
