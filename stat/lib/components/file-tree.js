import React from 'react'
import Component from '../component'
import { Menu, Icon, Button } from 'antd'
const SubMenu = Menu.SubMenu
import {buildSourceCode} from '../actions/app'

export default class FileTree extends Component {

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
    const {selectedDir, onSelect, onDeselect} = this.props
    const {dir} = item.props
    if (!dir) return
    if (selectedDir && dir.id === selectedDir.id) {
      onDeselect(dir)
    }
    else {
      onSelect(dir)
    }
  }

  build() {
    buildSourceCode()
  }

  handleSearch() {
    let {openSelection} = this.props
    openSelection && openSelection()
  }

  template() {
    const {dirs, selectedDir, onCreate} = this.props
    if (dirs && dirs.length) {
      return (
        <div>
        <Menu
          onClick={this.handleClick}
          theme='dark'
          selectedKeys={[selectedDir && selectedDir.id]}
          mode='inline'
        >
          {this.menuItemWithDirs(dirs)}
        </Menu>

        <div style = {{
          width: '100%',
          height: '40px',
          position: 'relative',
          bottom: 0
        }} >
          <Button type='primary'
            size='large'
            onClick={()=>onCreate(selectedDir)}
            disabled={!selectedDir}
            style={{
              width: '100%',
              height: '100%'
            }}>
            创建
          </Button>
          <Button type='primary'
            size='large'
            onClick={this.handleSearch}
            style={{
              width: '100%',
              height: '100%'
            }}>
            搜索
          </Button>
          <Button type='primary'
            size='large'
            onClick={this.build}
            style={{
              width: '100%',
              height: '100%'
            }}>
            编译
          </Button>
        </div>
        </div>
      )
    }
    return null
  }

}
