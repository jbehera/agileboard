import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBoard, createList, deleteList } from '../actions/board';

class BoardContainer extends Component {
    componentDidMount () {
        const boardId = this.props.match.params.id;
        this.props.getBoard(boardId);
    }

    onCreateList = () => {
        const boardId = this.props.match.params.id;
        this.props.createList("Test List", boardId);
    }

    render() {
        console.log('Board: ', this.props.board);
        return <div>Board... <button onClick={this.onCreateList}>Create List</button></div>;
    }
}

export default connect(state => {
    return {
        board: state.board
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
    }

}))(BoardContainer);