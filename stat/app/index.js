
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const url = require('url')

let win

const createWindow = () => {
    win = new BrowserWindow({width: 800, height: 600})

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // win.webContents.on('did-finish-load', () => {
    //     console.log('did-finish-load');
    //     win.webContents.send('stat-loading')
    //     rootStat.loadAllChildStats().then(()=>{
    //         console.log('stat-loaded => ', rootStat);
    //         win.webContents.send('stat-loaded', rootStat)
    //     }).catch(e => console.log(e))
    // })

    // win.webContents.openDevTools()

    win.on('closed', () => {
        win = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})

// ipcMain.on('stat save', (event, stat) => {
//     if (!stat) {
//         event.sender.send('stat save', {error: new Error('stat can not be null!')})
//         return
//     }
//     console.log('stat save ===> ', stat);
//
//     let superStat = stat.superStat && rootStat.findStatById(stat.superStat.id)
//     if (!superStat) {
//         superStat = rootStat
//     }
//     else if (!superStat.isDirectory) {
//         superStat = superStat.superStat
//     }
//
//     let statObj
//     if (stat.id) {
//         statObj = rootStat.findStatById(stat.id)
//         statObj.assign(stat)
//     }
//     else {
//         statObj = new Stat(stat)
//         superStat.addChildStat(statObj)
//     }
//     statObj.save().then(() => {
//         event.sender.send('stat save', {stat:statObj})
//     }).catch(error => event.sender.send('stat save', {error}))
// })
//
// ipcMain.on('stat history', (event, stat) => {
//     let statObj = rootStat.findStatById(stat.id)
//     if (statObj) {
//         statObj.loadHistoryStats()
//             .then(stats => {
//                 console.log('history: ==> ',stats);
//                 event.sender.send('stat history', {stats})
//             }).catch(error => event.sender.send('stat history', {error}))
//     }
//     else {
//         event.sender.send('stat history', {error: new Error('Stat object not exists')})
//     }
// })
