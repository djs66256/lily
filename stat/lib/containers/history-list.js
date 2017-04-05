import React from 'react'
import {connect} from 'react-redux'
import Component from '../component'
import StatItem from '../components/stat-item'
import StatItemList from '../components/stat-item-list'
import {dismissHistory} from '../actions/history'
import {Table, Card, Button} from 'antd'

class HistoryListContainer extends Component {

  template() {
    const {selectedDir, histories, onClick} = this.props
    let columns = selectedDir && selectedDir.getColumns()
    let index = 0
    let dataSource = histories.map(stat => {
      stat.key = index
      index++
      return stat
    })
    columns = columns && columns.filter(column => column.visible)
    return (
      <div style={{
        position: 'fixed',
        backgroundColor: 'rgba(0,0,0,0.3)',
        top: 0, bottom: 0, left: 0, right: 0
      }}>
      <Card title="历史"
        extra={<Button onClick={onClick} icon='close' shape="circle" />}
        style={{
          position: 'fixed',
          top: '10px',
          bottom: '10px',
          left: '10px',
          right: '10px'
        }}
        bodyStyle={{
          overflow: 'auto',
          position: 'absolute',
          bottom: 5, top: 45, left: 0, right: 0
        }}>
      <Table dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
      </Card>
      </div>
    )
  }
}

export default connect(
    state => {
      return {
        histories: state.histories,
        selectedDir: state.current.dir
      }
    },
    dispatch => {
      return {
        onClick: ()=> dismissHistory(dispatch)
      }
    }
)(HistoryListContainer)
