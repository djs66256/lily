import Persistent from './Persistent'
import { Stat } from './Stat'
const Path = require('path')
const fs = require('fs')

const mkdirs = function(dirpath, mode, callback) {
    fs.exists(dirpath, function(exists) {
        if(exists) {
            callback(dirpath);
        } else {
            //尝试创建父目录，然后再创建当前目录
            mkdirs(Path.dirname(dirpath), mode, function(){
                fs.mkdir(dirpath, mode, callback);
            });
        }
    });
};

class FilePersistent extends Persistent {

  async findStatAtPath(basedir) {
    let ver = await this.findRecentVersionNumber(basedir)
    if (ver < 1) throw new Error('File has no init!');
    const path = Path.join(basedir, ''+ver+'.json')
    let b = this.exists(path)
    if (b) {
      let json = await this.readJson(path)
      return new Stat(json)
    }
    else {
      throw new Error('File ' + path + ' not exists!')
      return null
    }
  }

  async findStatHistoryAtPath(basedir) {
      let dirs = await this.listdir(basedir)
      if (dirs && dirs.length) {
          dirs = dirs.filter(dir => dir.endsWith('.json')).map(name=>Path.join(basedir, name))
          let stats = []
          for (let path of dirs) {
              let json = await this.readJson(path)
              stats.push(new Stat(json))
          }
          return stats
      }
      return null
  }

  async saveStat(stat) {
    const basedir = stat.getBasedir()
    await this.checkDirectory(basedir)
    let ver = await this.findRecentVersionNumber(basedir)
    const filePath = Path.join(basedir, ''+(ver+1)+'.json')
    await this.saveJsonStringToPath(stat.toJsonString(), filePath)
    return true
  }

  checkDirectory(dir) {
      return new Promise((resolve, reject) => {
          mkdirs(dir, 0o777, function(){
              resolve(dir)
          })
      })
  }

  saveJsonStringToPath(jsonStr, path) {
      return new Promise((resolve, reject) => {
          fs.writeFile(path, jsonStr, {}, (err) => {
              if (err) {
                  reject(err)
              }
              else {
                  resolve()
              }
          })
      })
  }

  async findChildrenStatsAtBasePath(basePath) {
    let dirs = await this.listdir(basePath)
    let statsDir = dirs.filter(dir => {
      return !dir.startsWith('.') && !dir.startsWith('_') && !dir.endsWith('.json')
    }).map(dir => Path.join(basePath, dir)).filter(dir => {
      let stat = fs.statSync(dir)
      return stat.isDirectory()
    })

    let stats = await this.findChildrenStatsAtPaths(statsDir)

    return stats
  }

  findChildrenStatsAtPaths(paths) {
    return new Promise((resolve, reject) => {
      if (!paths || paths.length == 0) resolve([])
      let count = paths.length
      let stats = []
      for (let dir of paths) {
        this.findStatAtPath(dir).then(stat => {
          stats.push(stat)
          return stat
        }).catch(e => {console.log(e);}).then(() => {
          count --
          if (count == 0) {
            resolve(stats)
          }
        })
      }
    })
  }

  async findRecentVersionNumber(basedir) {
    let dirs = await this.listdir(basedir)
    dirs = dirs.filter(dir => dir.endsWith('.json')).map(dir => {
        return parseInt(dir)
    }).filter(num => !isNaN(num))
    let max = 0
    for (let num of dirs) {
      max = Math.max(max, num)
    }
    return max
  }

  async loadHistories(basedir) {
    let dirs = await this.listdir(basedir)
    if (dirs && dirs.length) {
        dirs = dirs.filter(dir => dir.endsWith('.json')).map(name=>Path.join(basedir, name))
        let stats = []
        for (let path of dirs) {
            let json = await this.readJson(path)
            if (json) stats.push(json)
        }
        return stats
    }
    return null
  }

  async loadStatNodes(basedir) {
    let dirs = await this.listdir(basedir)
    let statNodes = []
    for (let dir of dirs) {
      let statDir = Path.join(basedir, dir)
      if (fs.statSync(statDir).isDirectory()) {
        let ver = await this.findRecentVersionNumber(statDir)
        if (ver >= 1) {
          const path = Path.join(statDir, ''+ver+'.json')
          let b = this.exists(path)
          if (b) {
            let json = await this.readJson(path)
            if (json) statNodes.push(json)
          }
        }
      }
    }
    return statNodes
  }

  async loadDirNodes(basedir) {
    let dirs = await this.listdir(basedir)
    let dirNodes = []
    for (let dir of dirs) {
      let configPath = Path.join(basedir, dir, 'config.json')
      let exists = await this.exists(configPath)
      if (exists) {
        let json = await this.readJson(configPath)
        json.id = dir
        dirNodes.push(json)
      }
    }
    return dirNodes
  }

  exists(dir) {
    return new Promise((resolve, reject) => {
      fs.exists(dir, resolve)
    })
  }

  listdir(dir) {
      return new Promise((resolve, reject) => {
          fs.readdir(dir, (err, dirs) => {
              if (err) reject(err)
              else resolve(dirs)
          })
      })
  }

  readJson(path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, (err, data) => {
        if (!err) {
            const jsonStr = data.toString()
            try {
              const json = JSON.parse(jsonStr)
              if (json) {
                  resolve(json)
              }
              else {
                  reject(new Error('json data error!'))
              }
            }
            catch (e) {
              reject(e)
            }
        }
        else {
            reject(new Error('can not read file at ' + err.toString()))
        }
      })
    })
  }
}

module.exports = FilePersistent
