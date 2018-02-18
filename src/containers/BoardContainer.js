import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    getBoard, 
    createList, 
    deleteList,
    orderLists,
    createTask,
    deleteTask,
    orderTasks
} from '../actions/board';

import TaskLists from '../components/TaskLists';

class BoardContainer extends Component {

    constructor(props) {
        super(props);
        this.boardId = this.props.match.params.id;
    }

    componentDidMount () {
        this.props.getBoard(this.boardId);
    }

    onListAdd = (title) => {
        this.props.createList(title, this.boardId);
    }

    onListRemove = (id) => {
        this.props.deleteList(id);
    }

    onListMove = (position, nextPosition) => {
        this.props.orderLists(position, nextPosition, this.boardId);
    }

    onTaskAdd = (title, description, listId) => {
        this.props.createTask(title, description, listId)
    }

    onTaskRemove = (id, listId) => {
        this.props.deleteTask(id, listId);
    }

    onTaskMove = (position, nextPosition, listId) => {
        this.props.orderTasks(position, nextPosition, listId);
    }

      

    render() {
        if(this.props.board && this.props.board.lists) {
            const { lists, _id } = this.props.board;
            return (
                <TaskLists 
                    key={_id}
                    data={lists}
                    onListAdd={this.onListAdd}
                    onListRemove={this.onListRemove}
                    onListMove={this.onListMove}
                    onTaskAdd={this.onTaskAdd}
                    onTaskRemove={this.onTaskRemove}
                    onTaskMove={this.onTaskMove}/>
            );     
        } else {
            return (<div>Loading...</div>);
        }
    }
};

export default connect(state => {
    return {
        board: state.board && state.board.board
    }
}, (dispatch) => ({
    getBoard: (boardId) => {
        dispatch(getBoard(boardId));
    },
    createList: (title, boardId) => {
        dispatch(createList(title, boardId));
    },
    deleteList: (id) => {
        dispatch(deleteList(id));
    },
    orderLists: (position, nextPosition, boardId) => {
        dispatch(orderLists(position, nextPosition, boardId));
    },
    createTask: (title, description, listId) => {
        dispatch(createTask(title, description, listId));
    },
    deleteTask: (id, listId) => {
        dispatch(deleteTask(id, listId));
    },
    orderTasks: (position, nextPosition, listId) => {
        dispatch(orderTasks(position, nextPosition, listId));
    }

}))(BoardContainer);