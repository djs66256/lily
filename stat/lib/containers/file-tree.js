import React from 'react'
import {connect} from 'react-redux'
import Component from '../component'
import FileTree from '../components/file-tree'
import ActionButtons from '../components/action-buttons'

import {createStat, editStat, deleteStat} from '../actions/stat'
import {selectDir, deselectDir} from '../actions/current'
import {openSelection} from '../actions/app'

// class FileTreeContainer extends Component {
//
//     template(css) {
//         const {dirs, selectedDir, onClick, onAdd, onEdit, onDelete} = this.props
//         return (
//             <div className='ant-menu-dark'>
//             <ActionButtons
//                 onAdd={() => selectedDir && onAdd(selectedDir)}
//                 onEdit={() => selectedDir && onEdit(selectedDir)}
//                 onDelete={() => selectedDir && onDelete(selectedDir)}
//                 addEnable={true}
//                 editEnable={!!selectedDir}
//                 deleteEnable={!!selectedDir} />
//             <FileTree {...this.props} children={dirs}/>
//             </div>
//         )
//     }
//
// }

export default connect(
    state => {
      return {
        dirs: state.app.root.dirs,
        selectedDir: state.current.dir
      }
    },
    (dispatch) => {
      return {
        onSelect: dir => selectDir(dispatch, dir),
        onDeselect: dir => deselectDir(dispatch, dir),
        onCreate: dir => createStat(dispatch, false, dir),
        openSelection: () => openSelection(dispatch)
      }
    }
)(FileTree)
