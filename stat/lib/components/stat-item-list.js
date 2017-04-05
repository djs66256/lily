import React from 'react'
import Component from '../component'
import StatItem from './stat-item'

export default class StatItemList extends Component {

    template(css) {
        const {stats, onSortByKey} = this.props
        if (stats && stats.length) {
            return (
                <table className={"table table-striped table-hover " + css('stat-item')}>
                    <tbody>
                        <tr>
                            <th onClick={onSortByKey && onSortByKey('name')}>名称</th>
                            <th onClick={onSortByKey && onSortByKey('statId')}>统计ID</th>
                            <th>参数</th>
                            <th>备注</th>
                            <th onClick={onSortByKey && onSortByKey('privilage')}>优先级</th>
                            <th onClick={onSortByKey && onSortByKey('version')}>版本</th>
                            <th>iOS</th>
                            <th>Android</th>
                            <th onClick={onSortByKey && onSortByKey('createTime')}>修改时间</th>
                        </tr>
                        {stats}
                    </tbody>
                </table>
            )
        }
        else {
             return null
        }
    }

    styles() {
        return {
            'stat-item': {
                // width: '100%'
            }
        }
    }
}
