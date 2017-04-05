import React from 'react'
import {connect} from 'react-redux'
import Component from '../component'
import ActionButtons from '../components/action-buttons'
import StatItemList from './stat-item-list'
import {createStat, editStat, deleteStat} from '../actions/stat'
import {showHistory} from '../actions/history'
import {Table} from 'antd'

class ContentContainer extends Component {

  template() {
    const {selectedDir, onEdit, onDelete, onHistory} = this.props
    let columns = selectedDir && selectedDir.getColumns()
    let dataSource = selectedDir && selectedDir.stats //&& selectedDir.stats.map(stat => Object.assign({key: stat.id}, stat))
    columns = columns && columns.filter(column => column.visible).concat([{
      title:'',
      render: (text, record) => {
        return (<ActionButtons
            onEdit={() => record && onEdit(record)}
            onDelete={() => record && onDelete(record)}
            onHistory={() => record && onHistory(record)}
            />)
      }
    }])
    return (
      <div>
      <Table dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
      </div>
    )
  }
}

export default connect(state => {
  return {
    selectedDir: state.current.dir,
    selectedStat: state.current.stat,
    stats: state.current.dir && state.current.dir.stats
  }
}, dispatch => {
  return {
    onAdd: stat => createStat(dispatch, false, stat),
    onEdit: stat => editStat(dispatch, stat),
    onDelete: stat => deleteStat(dispatch, stat),
    onHistory: stat => showHistory(dispatch, stat)
  }
})(ContentContainer)
