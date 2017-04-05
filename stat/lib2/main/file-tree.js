import React from 'react'
import {Layout, Menu, Icon, Button} from 'antd'
const SubMenu = Menu.SubMenu

export default class FileTree extends React.Component {

  constructor() {
    super()
    this.menuItemWithDirs = this.menuItemWithDirs.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  menuItemWithDirs(dirs) {
    return dirs.map(dir => {
      if (dir.dirs && dir.dirs.length) {
        return (
          <SubMenu key={dir.id} title={<span>{dir.name}</span>} >
            {this.menuItemWithDirs(dir.dirs)}
          </SubMenu>)
      }
      else {
        return (<Menu.Item key={dir.id} dir={dir} >{dir.name}</Menu.Item>)
      }
    })
  }

  handleClick({item}) {
    const {selectedNode, onSelectedNodeChanged} = this.props
    const {dir} = item.props
    // console.log(dir);
    if (!dir) return
    if (selectedNode && dir.id === selectedNode.id) {
      onSelectedNodeChanged(null)
    }
    else {
      onSelectedNodeChanged(dir)
    }
  }

  build() {
    buildSourceCode()
  }

  handleSearch() {
    let {openSelection} = this.props
    openSelection && openSelection()
  }

  render() {
    const {root, selectedNode} = this.props
    if (root && root.dirs && root.dirs.length) {
      return (
        <div style={{
          height: '100%'
        }}>
          <Menu
            onClick={this.handleClick}
            theme='dark'
            selectedKeys={[selectedNode && selectedNode.id]}
            mode='inline' >
            {this.menuItemWithDirs(root.dirs)}
          </Menu>
        </div>
      )
    }
    return (<p>NO DATA</p>)
  }

}
