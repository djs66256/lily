import React from 'react'
import {Message, Table} from 'antd'

import NoData from '../no-data'

export default class History extends React.Component {

  constructor() {
    super()
    this.state = {histories:null}
  }

  componentDidMount() {
    const {currentNode} = this.props
    currentNode && currentNode.loadHistories().then((histories)=>{
      console.log('histories: ', histories);
      this.setState({histories})
    }).catch(e=>{
      console.log(e);
      e && Message.error(e.message)
    })
  }

  render() {
    if (this.state.histories) {
      const {currentNode} = this.props
      let columns = currentNode.getColumns()
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
      let paramKeys = columns.filter(o=>o.type==='params').map(o=>o.key)
      let dataSource = this.state.histories.reverse().slice(0, 50).map((node, index) => {
        node.key = index
        return node
      })
      return (<div style={{
        width: '100%',
        height: '100%',
        overflow: 'auto'
      }}>
        <Table dataSource={dataSource} columns={columns} pagination={false}/>
      </div>)
    }
    else {
      return <NoData />
    }
  }
}
