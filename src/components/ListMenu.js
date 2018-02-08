import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';

export default class ListMenu extends Component {

    handleAdd = () => {
        this.props.onAdd(this.props.id);
    }

    handleDelete = () => {
        this.props.onDelete(this.props.id);
    }

    handleMoveLeft = () => {
        const { id, position, boardId } = this.props;        
        this.props.onMoveLeft(id, position, boardId, position - 1);
    }

    handleMoveRight = () => {
        const { id, position, boardId } = this.props;        
        this.props.onMoveRight(id, position, boardId, position + 1);
    }

    render() {
        
        const iconButtonElement = (
            <IconButton
                touch={true}
                tooltip="more"
                tooltipPosition="bottom-left"
            >
                <MoreVertIcon color={grey400} />
            </IconButton>
        );
        
        return (           
            <IconMenu iconButtonElement={iconButtonElement}>
                <MenuItem onClick={this.handleMoveLeft}>Move Left</MenuItem>
                <MenuItem onClick={this.handleMoveRight}>Move Right</MenuItem>
                <MenuItem onClick={this.handleAdd}>Add Task</MenuItem>
                <MenuItem onClick={this.handleDelete}>Delete</MenuItem>
            </IconMenu>
        )
    }
};