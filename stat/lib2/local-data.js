import {remote} from 'electron'
// let {session} = remote
import {JSONStorage} from 'node-localstorage'
import path from 'path'
var nodeStorage = new JSONStorage(path.join(remote.app.getPath('userData'), 'stat'))

// const AppDomain = 'app://stat.rose.com'

const get = (key) => {
  return nodeStorage.getItem(key)
  // return new Promise((resolve, reject) => {
  //   session.defaultSession.cookies.get(Object.assign({domain: AppDomain}, params), function(error, cookies) {
  //     if (error) {
  //       reject(error)
  //     }
  //     else {
  //       resolve(cookies)
  //     }
  //   })
  // })
}

const remove = key => {
  nodeStorage.removeItem(key)
  // return new Promise((resolve, reject) => {
  //   session.defaultSession.cookies.remove(Object.assign({domain: AppDomain}, params), function(error, cookies) {
  //     if (error) {
  //       reject(error)
  //     }
  //     else {
  //       resolve(cookies)
  //     }
  //   })
  // })
}

const set = (key, value) => {
  nodeStorage.setItem(key, value)
  // return new Promise((resolve, reject) => {
  //   session.defaultSession.cookies.set(Object.assign({domain: AppDomain}, params), function(error, cookies) {
  //     if (error) {
  //       reject(error)
  //     }
  //     else {
  //       resolve(cookies)
  //     }
  //   })
  // })
}

export default {get, set, remove}
