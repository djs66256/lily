
// const fs = require('fs')

class BaseObject {
    // toJsonString() {
    // }
    //
    // getBasedir() {
    // }
    //
    // save(dir) {
    // }
    //
    // checkDirectory(dir) {
    //     return new Promise(resove, reject) {
    //         fs.exists(dir, (exists) => {
    //             if (exists) {
    //                 resovle()
    //             }
    //             else {
    //                 fs.mkdir(dir, (err, folder) => {
    //                     if (err) reject(err)
    //                     else resove()
    //                 }
    //             }
    //         })
    //     }
    // }
    //
    // static load(dir) {
    //     return new Promise(resovle, reject) {
    //         fs.stat(dir, (err, stat) => {
    //             if (!err) {
    //                 if (stat.isDirectory()) {
    //                     load(`{dir}/_index.json`).then(resovle).catch(reject)
    //                 }
    //                 else if (stat.isFile()) {
    //                     fs.readFile('dir', (err, data) => {
    //                         if (!err) {
    //                             const jsonStr = data.toString()
    //                             const json = JSON.parse(jsonStr)
    //                             if (json) {
    //                                 resovle(new Stat(json))
    //                             }
    //                             else {
    //                                 reject(new Error('json data error!'))
    //                             }
    //                         }
    //                         else {
    //                             reject(new Error('can not read file at '+err.toString())
    //                         }
    //                     })
    //                 }
    //                 else {
    //                     reject(new Error('unknow type at '+dir))
    //                 }
    //             }
    //             else {
    //                 reject(err)
    //             }
    //         })
    //     }
    // }
}

export default BaseObject
