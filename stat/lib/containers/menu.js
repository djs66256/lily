import React from 'react'
import {connect} from 'react-redux'
import Component from '../component'
import {beginCreating} from '../actions/app'

class Menu extends Component {

    test() {
        alert('hahahah')
    }

    template(css) {
        const {beginCreating, onCreateDir} = this.props
        return (
            <div >
                <button className={css('left')} onClick={beginCreating}>create stat</button>
                <button className={css('left')} onClick={()=> console.log('afjeowij')}>create dir</button>
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                    Button
                </button>
            </div>
        )
    }

    styles() {
        return {
            left: {
                float: 'left'
            }
        }
    }
}


export default connect(state => {
    return {
        rootStat: state.rootStat,
        selectStat: state.selectStat
    }
}, dispatch => {
    return {
        beginCreating: () => { beginCreating(dispatch) }
    }
})(Menu)
