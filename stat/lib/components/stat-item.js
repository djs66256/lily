import React from 'react'
import Component from '../component'

export default class StatItem extends Component {

    template(css) {
        const {stat, onClick, selected} = this.props
        return (
            <tr onClick={onClick} className={css(selected ? 'row-selected' : 'row')} >
                <td>{stat.name || ''}</td>
                <td>{stat.statId || ''}</td>
                <td>{stat.params && stat.params.map(p=>`${p.description}/${p.name}`).join(', ') || ''}</td>
                <td>{stat.description || ''}</td>
                <td>{stat.privilage || ''}</td>
                <td>{stat.version || ''}</td>
                <td>{stat.iOS || ''}</td>
                <td>{stat.android || ''}</td>
                <td>{stat.createTime || ''}</td>
            </tr>
        )
    }

    styles() {
        return {
            row: {

            },
            'row-selected': {
                'background-color': 'green'
            },
            'deleted': {
                'background-color': 'gray'
            }
        }
    }
}
