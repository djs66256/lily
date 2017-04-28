import React from 'react'
import {Button, Message} from 'antd'
const {dialog} = require('electron').remote
import {build} from '../../script/build'

export default class Nav extends React.Component {

  constructor() {
    super()
    this.state = {index: true}
    this.build = this.build.bind(this)
  }

  componentDidMount() {
    const {history} = this.props
    this.unlisten = history.listen((location, action) => {
      console.log('listen ', location);
      if (location.pathname == '/') {
        this.setState({index: true})
      }
      else {
        this.setState({index: false})
      }
    })
  }

  componentWillUnmount() {
    this.unlisten()
  }

  build() {
    const {rootNode} = this.props
    dialog.showOpenDialog({properties: ['openDirectory']}, dirs=>{
      if (dirs.length > 0) build(rootNode, dirs[0]).then(()=>{
        Message.info('编译成功')
      })
      // .catch(e=>{
      //   e && Message.error(e.message)
      //   console.log(e.message)
      // })
    })
  }

  render() {
    const {onCreate} = this.props
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'noWrap',
        alignItems: 'center',
        alignContent: 'center',

        height: '44px',
        flexGrow: 0,
        flexShrink: 0,
        backgroundColor: '#333'
      }}>
        <Button type='primary'
          size='large'
          style = {{marginLeft: 20}}
          onClick={()=>{
          console.log('home: /');
          if (this.props.history.canGo(-1)) {
            this.props.history.goBack()
          }
          else {
            this.props.history.replace('/')
          }
        }}>返回</Button>
        <Button type='primary'
          size='large'
          style = {{marginLeft: 20}}
          onClick={onCreate}
          disabled={!this.state.index}>
          创建
        </Button>
        <Button type='primary'
          size='large'
          style = {{marginLeft: 20}}
          disabled={!this.state.index}
          onClick={()=>{
            console.log('/search')
            this.props.history.push('/search')
          }}>
          搜索
        </Button>
        <Button type='primary'
          size='large'
          style = {{marginLeft: 20}}
          onClick={this.build}>
          编译
        </Button>
      </div>
    )
  }
}
