import React from 'react'
import {Input, Button} from 'antd'

class Filter extends React.Component {
  constructor() {
    super()
    this.onChange = this.onChange.bind(this)
  }

  onChange(p, p1) {
    const {onChange, column} = this.props
    onChange && onChange(column, p.target.value)
  }

  render() {
    const {column, style} = this.props
    return (
      <div style={style}>
        <label>
          <span style={{color: 'white'}}>{column.title}:</span>
          <Input onChange={this.onChange}/>
        </label>
      </div>
    )
  }
}

export default class Filters extends React.Component {

  constructor() {
    super()
    this.state = {filters:{}}
    this.onSearch = this.onSearch.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onSearch() {
    const {onFilters} = this.props
    if (onFilters) {
      let filters = Object.keys(this.state.filters)
        .map(key=>{return {key, value:this.state.filters[key]}})
        .filter(({key, value})=>{return value && value.length > 0})
      onFilters(filters)
    }
  }

  onChange(col, value) {
    this.state.filters[col.key] = value
  }

  render() {
    const {style, node} = this.props
    let columns = node.getColumns().filter(col => col.searchable)
    return (
      <div style={Object.assign({
        display: 'flex',
        flexFlow: 'row',
        flexWrap: 'noWrap',
        alignItems: 'center',
        overflow: 'auto',
        backgroundColor: 'rgba(0, 0, 0, 0.65)'
      }, style)}>
        <Button type='primary' icon='search' style={{
          marginLeft:20,
          marginRight: 10,
          flexGrow: 0,
          flexShrink: 0
        }} onClick={this.onSearch}>搜索</Button>
      {
        columns.map(col => {
          return (<Filter style={{
            marginLeft:10,
            width:100,
            flexShrink: 0
          }}
            column={col} key={col.key}
            onChange={this.onChange}/>)
        })
      }
      </div>
    )
  }
}
