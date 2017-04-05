import React from 'react'
import {getRootNode, saveStat} from '../stat-data'
import {Card, Input, Form, Message, Button, Select, Icon} from 'antd'
const Option = Select.Option

class ParamsComponent extends React.Component {
  constructor() {
    super()
    this.add = this.add.bind(this)
    this.componentWillMount = this.componentWillMount.bind(this)
    this.remove = this.remove.bind(this)
    this.uuid = 0
  }

  componentWillMount() {
    let {params, paramsKey} = this.props
    this.state = params && {params} || {params: []}
    let dir = getRootNode().findDirNodeById(paramsKey)
    dir.loadStatNodes().then(()=>{
      if (dir && dir.stats) {
        this.paramOptions = dir.stats
        this.setState(Object.assign({}, this.state))
      }
    }).catch(e=>{
      Message.error(e.message)
    })

  }

  add(value) {
    if (value) {
      if (this.state.params && this.state.params.find(p=>p.id===value)) {
        Message.info('已添加该参数')
        return
      }
      let p = this.paramOptions.find(i => i.id === value)
      if (p) {
        let params = this.state.params && this.state.params.concat([p]) || [p]
        this.setState({params})
        const {onChange} = this.props
        onChange && onChange(params)
      }
    }
  }

  remove(id) {
    if (id) {
      let params = this.state.params && this.state.params.filter(p => p.id!==id) || []
      this.setState({params})
      const {onChange} = this.props
      onChange && onChange(params)
    }
  }

  render() {
    const {formItemLayout} = this.props
    const formItems = this.state && this.state.params && this.state.params.map(param => {
      return (
        <Form.Item label='参数'
          style={{
            margin: 0
          }}
          key={param.id}
          {...formItemLayout}
        >
          <span>{`${param.paramId}: ${param.name}`}</span>
          <Button
            className="dynamic-delete-button"
            icon="minus"
            onClick={() => this.remove(param.id)}
            shape='circle'
            style={{
              marginLeft: 10
            }}
          />
        </Form.Item>
      )
    })
    if (this.paramOptions && this.paramOptions.length) {
      return (
        <div>
          {formItems}
          <Form.Item label='添加参数' {...formItemLayout}>
            <Select defaultValue="defaultValue" value="defaultValue" onSelect={this.add}>
              <Option value='defaultValue' disabled>添加参数</Option>
              {this.paramOptions.map(param => {
                return <Option value={param.id} key={param.id}>{`${param.paramId}: ${param.name}`}</Option>
              })}
            </Select>
          </Form.Item>
        </div>
      )
    }
    else {
      return null
    }
  }
}

export default class CreateStat extends React.Component {

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.saveStat = this.saveStat.bind(this)
    this.handleParamsChange = this.handleParamsChange.bind(this)
  }

  componentWillMount() {
    let {currentNode} = this.props
    this.state = currentNode || {}
  }

  saveStat() {
    const {selectedNode} = this.props
    let columns = selectedNode.getColumns()
    if (columns) {
      const requiredCols = columns.filter(column=>column.editable && column.required)
      for (let col of requiredCols) {
        if (!this.state[col.key]) {
          Message.error('数据不完整')
          return
        }
      }
      saveStat(this.state, selectedNode).then(()=>{
        Message.info('保存成功')
        console.log('/');
        this.props.history.replace('/')
      }).catch(e=>{
        e && Message.error(e.message)
      })
    }
  }

  handleChange(event) {
    let state = this.state
    state[event.target.id] = event.target.value
    this.setState(state)
  }

  handleParamsChange(params) {
    this.state.params = params
  }

  render() {
    let {onCancel, currentNode, selectedNode} = this.props
    let columns = selectedNode.getColumns()
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    }
    return (
        <div style={{
          width: '100%',
          height: '100%',
          overflow: 'auto',
          padding: '20px 0'
        }}>
              <Form >
                {columns && columns.length && columns.filter(column=>column.editable).map(column => {
                  if (column.type === 'text') {
                    return (
                      <Form.Item label={column.title} key={column.key} {...formItemLayout}>
                        <Input
                          placeholder={column.placeholder}
                          id={column.key}
                          value={this.state[column.key]}
                          onChange={this.handleChange} />
                      </Form.Item>
                    )
                  }
                  else if (column.type === 'params') {
                    return (
                      <div key={column.key} >
                      <div style={{
                        marginBottom: 20,
                        height: 1,
                        backgroundColor: 'lightgray'
                      }} ></div>
                      <ParamsComponent params={this.state.params}
                        formItemLayout={formItemLayout}
                        onChange={this.handleParamsChange}
                        {...column}/>
                      <div style={{
                        marginBottom: 20,
                        height: 1,
                        backgroundColor: 'lightgray'
                      }} ></div>
                      </div>
                    )
                  }
                  return <br/>
                })}
              </Form>
              <div style={{margin: 'auto', width: '50%'}}>
                <Button onClick={this.saveStat}
                  type='primary'
                  size='large'>
                  保存
                </Button>
              </div>
        </div>
    )
  }
}
