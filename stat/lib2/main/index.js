import React from 'react'
import {Layout} from 'antd'
import FileTree from './file-tree'
import {StatTable} from '../stat'


export default class Main extends React.Component {

  render() {
    const {onSelectedNodeChanged, onEdit, onHistory,
      root, selectedNode, style} = this.props
    return (
      <Layout style={Object.assign({
        height: '100%',
        backgroundColor: 'white'
      }, style)}>
        <Layout.Sider style={{overflow: 'auto'}}>
          <FileTree
            onSelectedNodeChanged={onSelectedNodeChanged}
            root={root}
            selectedNode={selectedNode}/>
        </Layout.Sider>
        <Layout.Content style={{overflow: 'auto'}}>
          <StatTable
            node={selectedNode}
            onEdit={onEdit}
            onHistory={onHistory}/>
          {this.props.children}
        </Layout.Content>
      </Layout>
    )
  }
}
