
import React from 'react'
import {Spin} from 'antd'

class Loading extends React.Component {

    render() {
        return (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'}}>
            <Spin size='large'/>
          </div>
        )
    }
}

export default Loading
