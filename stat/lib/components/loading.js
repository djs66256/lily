
import React from 'react'
import Component from '../component'

class Loading extends Component {

    template(css) {
        return (
        <div id="circularG" style={{
            margin: 'auto',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            position: 'absolute'
        }}>
        	<div id="circularG_1" className="circularG"></div>
        	<div id="circularG_2" className="circularG"></div>
        	<div id="circularG_3" className="circularG"></div>
        	<div id="circularG_4" className="circularG"></div>
        	<div id="circularG_5" className="circularG"></div>
        	<div id="circularG_6" className="circularG"></div>
        	<div id="circularG_7" className="circularG"></div>
        	<div id="circularG_8" className="circularG"></div>
        </div>
        )
    }
}

export default Loading
