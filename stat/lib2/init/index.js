import React from 'react'
import {Button, Message} from 'antd'
import {selectDataDir, loadRootStat} from '../stat-data'

export default class Init extends React.Component {

  constructor() {
    super()
    this.selectDataDir = this.selectDataDir.bind(this)
  }

  selectDataDir() {
    console.log(this);
    selectDataDir().then(dir => {
      loadRootStat(dir).then((stdout) => {
        if (stdout) Message.info(stdout.toString())
        this.props.history.replace('/')
      })
    }).catch(e => {
      console.log(e)
      Message.error(e.message)
    })
  }

  render() {
    return (
      <div style={{
        margin: '-20px 0 0 -40px',
        top: '50%',
        left: '50%',
        position: 'absolute'
      }}>
        <Button
          type='primary'
          size='large'
          onClick={this.selectDataDir}>
          选择数据目录
          </Button>
      </div>
    )
  }
}
