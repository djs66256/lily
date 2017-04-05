import React from 'react'
import {Message, Spin, Table} from 'antd'

import Filters from './filters'

export default class Search extends React.Component {

  constructor() {
    super()
    this.state = {
      loading: false,
      stats: []
    }
    this.onFilters = this.onFilters.bind(this)
  }

  componentDidMount() {
    let node = null
    const {rootNode} = this.props
    for (let dir of rootNode.dirs) {
      if (dir.id == 'event') {
        node = dir
        break;
      }
    }
    if (!node) {
      Message.error('数据格式错误')
      return
    }
    this.state.node = node
    this.setState(this.state)
  }

  onFilters(filters) {
    console.log(filters);
    const {rootNode} = this.props
    this.filterStats = []
    if (filters && filters.length > 0 && this.state.node) {
      this.state.loading = true
      this.setState(this.state)

      filters = filters.map(({key, value})=>(stat)=>{
        let re = new RegExp(value)
        if (stat && stat[key]) {
          return stat[key].toString().match(re)
        }
        else {
          return false
        }
      })

      rootNode.enumeratStatNode({node: this.state.node, callback: stat=>{
        for (let filter of filters) {
          if (!filter(stat)) return
        }
        this.filterStats.push(stat)
      }}).then(()=>{
        this.state.stats = this.filterStats
        this.state.loading = false
        this.setState(this.state)
      }).catch(e=>{
        console.log(e.message)
        Message.error(e.message)
        this.state.loading = false
        this.setState(this.state)
      })
    }
    else {
      this.state.loading = false
      this.state.stats = []
      this.setState(this.state)
    }
  }

  render() {
    if (this.state.node) {
      return (
        <div style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto'
        }}>
          <Spin spinning={this.state.loading} size='large'>
          <Filters style={{
            width: '100%',
            height: 50,
            flexShrink: 0,
            flexGrow: 0
          }} node={this.state.node} onFilters={this.onFilters}/>
          <div style={{
            width: '100%',
            flexShrink: 1,
            flexGrow: 1,
            overflow: 'auto'
          }}>
          {
            this.state.node && (() => {
              let columns = this.state.node.getColumns()
              columns.forEach(column => {
                if (column.type == 'params') {
                  column.render = (text, record) => {
                    let {key} = column
                    let params = record[key]
                    if (params && params.length > 0) {
                      let displayParams = []
                      for (let p of params) {
                        let {name, paramId} = p
                        displayParams.push(`${paramId} / ${name}`)
                      }
                      return JSON.stringify(displayParams)
                    }
                    return null
                  }
                }
              })
              let dataSource = this.state.stats.slice(0, 500).map((node, index) => {
                node.key = node.id
                return node
              })
              return (<Table dataSource={dataSource} columns={columns} pagination={false}/>)
            })()
          }
          </div>
          </Spin>
        </div>
      )
    }
    else {
      return (<div><h1>数据错误</h1></div>)
    }
  }
}
