import React from 'react'
import {connect} from 'react-redux'
import { Spin, Button, Alert } from 'antd'
import {APP_INIT, APP_LOADING, APP_READY, APP_CREATING, APP_SEARCH} from '../constants/app'
import {} from '../actions/stat'

import Component from '../component'
import Loading from '../components/loading'

import FileTree from './file-tree'
import Menu from './menu'
import Content from './content'

import CreateStat from './create-stat'
import HistoryList from './history-list'

import {selectDataDir, loadRootStat} from '../actions/app'

import Search from './search.js'

class App extends Component {

    componentDidMount() {
        // const {reloadData} = this.props
        // if (reloadData) {
        //     reloadData()
        // }
    }

    template(css) {
        const { ready, editing, displayHistory, searching,
          error,
          basedir, selectDataDir,
          loadRootStat } = this.props
        if (error) {
          return (<Alert
            message='ERROR'
            description={error.message}
            type="error"
            showIcon />)
        }
        else if (ready && basedir) {
            return (
                <div style={{height:'100%'}}>
                    // <div className={css('menu')}>
                    //     <Menu />
                    // </div>
                    <div className={css('app-content')}>
                        <div className={css('file-tree')}>
                            <FileTree />
                        </div>
                        <div className={css('content')}>
                            <Content />
                        </div>
                    </div>
                    {editing && (<CreateStat />)}
                    {displayHistory && (<HistoryList />)}
                    {searching && <Search />}
                 </div>
            )
        }
        else if (!basedir) {
          return (
            <div style={{
              margin: '-20px 0 0 -40px',
              top: '50%',
              left: '50%',
              position: 'absolute'
            }}>
              <Button type='primary' size='large' onClick={selectDataDir}>选择数据目录</Button>
            </div>)
        }
        else {
          loadRootStat(basedir)
          return (
            <div style={{
              margin: '-20px 0 0 -20px',
              top: '50%',
              left: '50%',
              position: 'absolute'
            }}>
              <Spin size="large" />
            </div>
          )
        }
    }

    styles() {
        return {
            menu: {
                width: '100%',
                height: '100px',
                'background-color': 'red'
            },
            'app-content': {
                position: "fixed",
                top: "0",
                bottom: "0",
                left:"0",
                right: "0",
                'background-color': 'gray'
            },
            'file-tree': {
                width: '200px',
                float: 'left',
                height: '100%',
                overflow: 'auto'
            },
            'content': {
                'margin-left': '100px',
                'background-color': 'white',
                'overflow': 'auto',
                "height": "100%"
            }
        }
    }
}

export default connect(
  state => {
    let st = {
      basedir: state.app.basedir,
      ready: !!state.app.root,
      error: state.app.error,
      editing: !!state.edit.stat,
      displayHistory: !!state.histories,
      searching: state.app.type == APP_SEARCH
    }
        // if (state.createStat.creating) {
        //     st.createStat = state.createStat
        // }
    return st
  },
  dispatch => {
    return {
      selectDataDir: () => selectDataDir(dispatch),
      loadRootStat: (basedir) => loadRootStat(dispatch, basedir)
    }
  }
)(App)
