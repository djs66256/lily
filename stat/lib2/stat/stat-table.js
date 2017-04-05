import React from 'react'
import {Table} from 'antd'
import ActionButtons from './action-buttons'
import NoData from '../no-data'

export default class StatTable extends React.Component {

  render() {
    const {node, onEdit, onHistory} = this.props
    if (node) {
      let dataSource = node.stats
      let columns = node.getColumns().filter(col => {
        return col.visible
      })
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
      columns.push({
        title: '操作',
        key: 'action',
        render: (text, record, index) => {
          return (
            <ActionButtons
              onEdit={()=>onEdit && onEdit(record)}
              onHistory={()=>onHistory && onHistory(record)}/>
          )
        }
      })
      return (<div>
        <Table dataSource={dataSource} columns={columns} pagination={false}/>
      </div>)
    }
    else {
      return <NoData />
    }
  }
}
