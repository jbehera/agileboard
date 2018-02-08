
import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import './styles/List.css';
import ListMenu from './ListMenu';
import Task from './Task';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class ListComponent extends Component {

    constructor(props) {
        super(props);

        this.state = { title: '', description: '', add: false };
    }

    handleOnDelete = (id) => {
        this.props.onDelete(id, this.props.boardId);
    };

    handleMove = (id, position, boardId, direction) => {
        this.props.onMove(id, position, boardId, direction);
    }

    handleTitleChange = (e) => {
        this.setState({ title: e.target.value });
    }

    handleDescChange = (e) => {
        this.setState({ description: e.target.value });
    }

    handleAdd = () => {
        this.setState({ add: true });
    }

    handleTaskAdd = () => {
        const title = this.state.title;
        const description = this.state.description;
        const listId = this.props.list._id;
        const boardId = this.props.boardId;        
        this.props.onTaskAdd(title, description, listId, boardId);
        this.setState({ add: false, title: '', description: '' });
    }

    handleTaskCancel = () => {
        this.setState({ add: false, title: '', description: '' });
    }

    renderList = (list, boardId) => {
        return (
            <List className="List-container" key={list._id} >                
                <Subheader>                    
                    {list.title}
                    {<ListMenu 
                        id={list._id}
                        position={list.position}
                        boardId={boardId} 
                        onDelete={this.handleOnDelete} 
                        onMoveLeft={this.handleMove} 
                        onMoveRight={this.handleMove}
                        onAdd={this.handleAdd} />}
                </Subheader>                
                {this.state.add && (
                    <div>
                        <div style={{padding: '10px 20px'}}>
                            <TextField 
                                fullWidth={true}
                                id="taskTitle"
                                hintText="Enter task title...."
                                value={this.state.title}
                                onChange={this.handleTitleChange} /><br/>
                            <TextField 
                                fullWidth={true}
                                id="taskDescription"
                                hintText="Enter task description...."
                                value={this.state.description}
                                onChange={this.handleDescChange} />                        
                        </div>
                        <div style={{margin: '5px 20px'}}>
                            <FlatButton label="Save" onClick={this.handleTaskAdd} primary={true} />
                            <FlatButton label="Cancel" onClick={this.handleTaskCancel} />
                        </div>
                    </div>                    
                )}
                {list.tasks.map(task => <Task key={task._id} task={task} />)}
            </List>
        );
    }

    render() {
        const { list, boardId } = this.props;
        return (
            <div>
                {this.renderList(list, boardId)}
            </div>
        )
    }
}

export default ListComponent;

