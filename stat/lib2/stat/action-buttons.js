import React from 'react'
import {Button, Icon} from 'antd'

export default class ActionButtons extends React.Component {

    render() {
        const {
            onAdd, onEdit, onDelete, onHistory,
            addEnable, editEnable, deleteEnable
            } = this.props
        return (
            <Button.Group>
                <Button onClick={onEdit} icon='edit'></Button>
                {/*<Button onClick={onDelete} icon='minus'></Button>*/}
                <Button onClick={onHistory} icon='info-circle-o'></Button>
            </Button.Group>
        )
    }
}
