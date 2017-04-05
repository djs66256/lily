import React from 'react'
import {connect} from 'react-redux'
import StatItem from '../components/stat-item'
import {selectStat, deselectStat} from '../actions/current'

class StatItemContainer extends React.Component {
    render() {
        const {stat, selectedStat, selectStat, deselectStat} = this.props
        const selected = stat.id===selectedStat.id
        return (
            <StatItem stat={stat}
                onClick={() => {selected ? deselectStat(stat) : selectStat(stat)}}
                selected={selected} />
        )
    }
}

export default connect(
    state => {
        return {
            selectedStat: state.current.stat
        }
    },
    dispatch => {
        return {
            selectStat: stat => selectStat(dispatch, stat),
            deselectStat: stat => deselectStat(dispatch, stat)
        }
    }
)(StatItemContainer)
