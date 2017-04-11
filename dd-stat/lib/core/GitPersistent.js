const exec = require('child_process').exec

const platform = require('os').platform()
const shSep = platform == 'win32' ? ' && ' : ';'

class GitPersistent {

  constructor(basedir) {
    this.basedir = basedir
  }

  pull({stash = false}={}) {
    return new Promise((resolve, reject) => {
      let cmd = `
cd "${this.basedir}"${shSep}\
${stash ? `git stash${shSep}` : ''}\
git pull origin master\
${stash ? `${shSep}git stash pop${shSep}` : ''}`
//alert(cmd)
      exec(cmd, (err, stdout, stderr) => {
        console.log(err, stdout, stderr);
        if (err) {
          reject(err)
        }
        else {
          resolve(stdout)
        }
      })
    })
  }

  commit(message) {
      return new Promise((resolve, reject) => {
        let cmd = `cd "${this.basedir}"${shSep} git add *${shSep} git commit -m "${message}"`
        //alert(cmd)
        exec(cmd, (err, stdout, stderr) => {
          console.log(err, stdout, stderr);
          if (err) {
          //alert(err.message)
            reject(err)
          }
          else {
            resolve(stdout)
          }
        })
      })
  }

  push() {
      return new Promise((resolve, reject) => {
        let cmd = `cd "${this.basedir}"${shSep} git push origin master`
        //alert(cmd)
        exec(cmd, (err, stdout, stderr) => {
          console.log(err, stdout, stderr);
          if (err) {
            reject(err)
          }
          else {
            resolve(stdout)
          }
        })
      })
  }

  status() {
    return new Promise((resolve, reject) => {
      exec(`cd "${this.basedir}"${shSep} git status`, (err, stdout, stderr) => {
        console.log(err, stdout, stderr);
        if (err) {
          reject(err)
        }
        else {
          resolve(stdout)
        }
      })
    })
  }
}

module.exports = GitPersistent
