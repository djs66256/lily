import {Provider} from 'react-redux'
import React from 'react'
import {render} from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {APP_LOADING, APP_READY, APP_RELOAD} from './constants/app'
import {STAT_CREATE_DONE, STAT_END_EDITING} from './constants/stat'
import {CURRENT_SELECT_DIR} from './constants/current'
import {HISTORY_SHOW} from './constants/history'

import App from './containers/App'
import reducer from './reducers/app'

import createLogger from 'redux-logger';
const logger = createLogger();
const store = createStore(reducer, applyMiddleware(logger))

const app = render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('content')
)

import {checkDataDir, clearDataDir} from './actions/app'
// clearDataDir(store.dispatch)
checkDataDir(store.dispatch)

// console.log('begin dd-stat');
// const { Stat } = require('dd-stat')
// console.log(Stat);
// console.log(Stat.default.test)
// Stat.default.test()
/*
import {ipcRenderer} from 'electron'

ipcRenderer.on('stat-loaded', (sender, rootStat) => {
    console.log('APP loaded');
    store.dispatch({
        type: APP_READY,
        payload: applyStat(rootStat)
    })
})

ipcRenderer.on('stat-loading', () => {
    console.log('APP Loading');
    store.dispatch({
        type: APP_LOADING
    })
})

ipcRenderer.on('stat save', (sender, {error, stat}) => {
    if (!error) {
        let superStat = findStatById(store.getState().app.rootStat, stat.superStat.id)
        if (superStat) {
            if (!superStat.childStats) superStat.childStats = []
            saveStatToSuperSat(stat, superStat)
            store.dispatch({type: STAT_END_EDITING})
            // store.dispatch({
            //     type: CURRENT_SELECT_DIR,
            //     payload: superStat
            // })
            // store.dispatch({
            //     type: APP_READY
            // })
        }
        else {
            console.log('super stat not exists');
        }
    }
    else {
        console.log(error);
    }
})

ipcRenderer.on('stat history', (sender, {error, stats}) => {
    if (stats && stats.length) store.dispatch({
        type: HISTORY_SHOW,
        payload: stats
    })
})

function applyStat(stat) {
    if (stat && stat.childStats && stat.childStats.length) {
        for (let chStat of stat.childStats) {
            chStat.superStat = stat
            applyStat(chStat)
        }
    }
    return stat
}

function saveStatToSuperSat(stat, superStat) {
    stat.superStat = superStat
    for (let i=0; i<superStat.childStats.length; i++) {
        let childStat = superStat.childStats[i]
        if (childStat.id === stat.id) {
            superStat.childStats[i] = stat
            return
        }
    }
    superStat.childStats = superStat.childStats.concat(stat)
}

function findStatById(stat, id) {
    if (id && stat.id === id) {
        return stat
    }
    else if (stat.childStats) {
        for (let ch of stat.childStats) {
            let aStat = findStatById(ch, id)
            if (aStat) return aStat
        }
    }
    return null
}*/
