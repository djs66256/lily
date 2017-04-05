import React from 'react'
import {connect} from 'react-redux'
import Component from '../component'
import StatItem from './stat-item'
// import StatItem from '../components/stat-item'
import StatItemList from '../components/stat-item-list'

class SearchContainer extends Component {

    constructor() {
        super()
        this.onSortByKey = this.onSortByKey.bind(this)
        this.sortObjectForKey = this.sortObjectForKey.bind(this)
        this.removeSortObject = this.removeSortObject.bind(this)
        this.sortArray = []
    }

    componentWillMount() {
      const {root} = this.props
    }

    sortObjectForKey(key) {
        for (let sortObj of this.sortArray) {
            if (sortObj.key === key) {
                return sortObj
            }
        }
        return null
    }

    removeSortObject(obj) {
        this.sortArray = this.sortArray.filter(s => s!=obj)
    }

    onSortByKey(key) {
        return () => {
            if (key) {
                let sortObj = this.sortObjectForKey(key)
                if (!sortObj) {
                    sortObj = {key, reverse: false, func: (a, b) => a[key] || a[key] >= b[key]}
                    this.sortArray.push(sortObj)
                }
                else {
                    this.removeSortObject(sortObj)
                    if (!sortObj.reverse) {
                        sortObj = {key, reverse: true, func: (a, b) => a[key] && a[key] <= b[key]}
                        this.sortArray.push(sortObj)
                    }
                }
                // this.setState(this.state || {})
                this.forceUpdate()
            }
        }
    }

    render() {
      return <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap'
      }}>
        <div style={{
          width: '100%',
          height: '44px',
          backgroundColor: 'red'
        }}>
        </div>
      </div>
        // const {selectedDir} = this.props
        // let stats = selectedDir.childStats && selectedDir.childStats.filter(stat=>!stat.isDirectory)
        // if (stats && stats.length) for (let sortObj of this.sortArray) {
        //     stats = stats.sort(sortObj.func)
        // }
        // //stats = stats.sort((a, b) => a.deleted)
        // return (
        //     <StatItemList onSortByKey={this.onSortByKey} stats={stats && stats.length && stats.map(stat => (<StatItem stat={stat} />))} />
        // )
    }
}

export default connect(
    state => {
        return {
            root: state.app.root
        }
    },
    dispatch => {
        return {}
    }
)(SearchContainer)
