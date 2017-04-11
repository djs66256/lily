import React from 'react'
import {render} from 'react-dom'
import {Message} from 'antd'
import {Router, Switch, Route, IndexRoute, Link} from 'react-router'
import {getDataDir, loadRootStat} from './stat-data'
// import {browserHistory} from 'react-router/lib/browserHistory'
import App from './app'
import Main from './main'
import Create from './create'
import History from './history'
import Search from './search'
import Stat from './stat'
import Init from './init'
import Loading from './loading'

const m = require('./main')

import {createMemoryHistory} from 'history'

const history = createMemoryHistory()

const app = render(
  (<Router history={history}>
    <div style={{ width: '100%', height: '100%' }}>
      <Switch>
      <Route path='/init' component={Init} />
      <Route path='/loading' component={Loading} />
      <Route path='/' component={App} >
      </Route>
      </Switch>
    </div>
  </Router>),
    document.getElementById('content')
)

history.replace('/loading')
// history.location.pathname = '/loading'
console.log(history, history.location);
const basedir = getDataDir()
console.log('basedir: ', basedir);
if (/*false && */basedir) {
  loadRootStat(basedir).then((stdout) => {
    if (stdout) Message.info(stdout)
    console.log('go to index');
    history.replace('/')
  }).catch(e => {
    if (e && e.message) Message.error(e.message)
    console.log(e);
    history.replace('/init')
  })
}
else {
  history.replace('/init')
}
