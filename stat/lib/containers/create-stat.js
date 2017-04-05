import React from 'react'
import CreateStat from '../components/create-stat'
import Component from '../component'
import {connect} from 'react-redux'
import {saveStat, cancel} from '../actions/stat'
import {StatNode} from 'dd-stat'
import {message} from 'antd'

class CreateStatContainer extends Component {

    // constructor() {
    //     super()
    //     this.saveStat = this.saveStat.bind(this)
    // }

    // saveStat(stat) {
    //     const {rootStat, onSave} = this.props
    //     console.log('saveStat: ', rootStat, onSave);
    //     let statObj = new Stat(stat)
    //     rootStat.addChildStat(stat)
    //     onSave(statObj)
    // }

    render() {
        return (
            <CreateStat {...this.props} />
        )
    }
}

export default connect(
    state => {
      return {
        stat: state.edit.stat,
        selectedDir: state.current.dir,
        columns: state.current.dir && state.current.dir.getColumns()
      }
    },
    dispatch => {
      return {
        onSave: (stat, dir) => {
          saveStat(dispatch, stat, dir).then(()=>{
            message.info('保存成功')
          }).catch(e => message.error(e.message))
        },
        onCancel: () => { cancel(dispatch) }
      }
    }
)(CreateStatContainer)
