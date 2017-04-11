const exec = require('child_process').exec

class GitPersistent {

  constructor(basedir) {
    this.basedir = basedir
  }

  pull({stash = false}={}) {
    return new Promise((resolve, reject) => {
      exec(`
cd "${this.basedir}";
${stash ? 'git stash;' : ''}
git pull origin master;
${stash ? 'git stash pop;' : ''}`, (err, stdout, stderr) => {
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
        exec(`cd "${this.basedir}"; git add *; git commit -m "${message}";`, (err, stdout, stderr) => {
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

  push() {
      return new Promise((resolve, reject) => {
        exec(`cd "${this.basedir}"; git push origin master`, (err, stdout, stderr) => {
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
      exec(`cd "${this.basedir}"; git status;`, (err, stdout, stderr) => {
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
