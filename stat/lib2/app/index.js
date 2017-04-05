import React from 'react'
import {Button, Message} from 'antd'
import Main from '../main'
import {getRootNode} from '../stat-data'

import Nav from './nav'
import History from '../history'
import Create from '../create'
import Search from '../search'

import {Router, Switch, Route, IndexRoute, Link} from 'react-router'
import {createMemoryHistory} from 'history'

const history = createMemoryHistory()

class MainContainer extends React.Component {
  render() {
    let props = Object.assign({}, this.props)
    delete props.children
    return (
      <div style={{
        display: 'flex',
        height: '100%',
        flexGrow: 1
      }}>
        <Main {...props}/>
        {this.props.children}
      </div>
    )
  }
}

export default class App extends React.Component {

  constructor() {
    super()
    this.onSelectedNodeChanged = this.onSelectedNodeChanged.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.onHistory = this.onHistory.bind(this)
    this.onCreate = this.onCreate.bind(this)
    this.state = {
      root: getRootNode() || null,
      selectedNode: null,
      currentNode: null
    }
  }

  onEdit(stat) {
    this.props.history.replace('/edit', stat)
    console.log('/edit', stat);
  }

  onHistory(stat) {
    this.props.history.replace('/history', stat)
    console.log('/history', stat);
  }

  onCreate() {
    if (this.state.selectedNode) {
      this.props.history.replace('/create')
      console.log('/create')
    }
    else {
      Message.error('请先选择目录')
    }
  }

  onSelectedNodeChanged(dirNode) {
    if (dirNode) {
      dirNode.loadStatNodes().then(() => {
        this.state.selectedNode = dirNode
        this.setState(this.state)
      }).catch(e => {
        e && Message.error(e.message)
      })
    }
    else {
      this.state.selectedNode = null
      this.setState(this.state)
    }
  }

  render() {
    let props = {
      onSelectedNodeChanged:this.onSelectedNodeChanged,
      root:this.state.root,
      selectedNode:this.state.selectedNode,
      onHistory:this.onHistory,
      onEdit:this.onEdit
    }
    return (<div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Nav history={this.props.history} rootNode={this.state.root} onCreate={this.onCreate}/>
      <Switch>
        <Route path='/history'>
          <MainContainer style={{display: 'none'}} {...props}>
            <History
              currentNode={this.props.history.location.state} />
          </MainContainer>
        </Route>
        <Route path='/create'>
          <MainContainer style={{display: 'none'}} {...props}>
            <Create selectedNode={this.state.selectedNode}
              history={this.props.history}/>
          </MainContainer>
        </Route>
        <Route path='/edit'>
          <MainContainer style={{display: 'none'}} {...props}>
            <Create
              currentNode={this.props.history.location.state}
              selectedNode={this.state.selectedNode}
              history={this.props.history}/>
          </MainContainer>
        </Route>
        <Route path='/search'>
          <MainContainer style={{display: 'none'}} {...props}>
            <Search rootNode={this.state.root} />
          </MainContainer>
        </Route>
        <Route>
          <MainContainer {...props}/>
        </Route>
      </Switch>
    </div>)
  }
}
