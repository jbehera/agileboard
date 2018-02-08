import React, { Component } from 'react';
import Board from './Board';
import './styles/Dashboard.css';
import FlatButton from 'material-ui/FlatButton';
import CreateBoardDialog from './BoardDialog';
import { GET_BOARDS } from '../containers/Dashboard';

export default class Dashboard extends Component {

    handleBoardSelect = (id) => {
        this.props.history.push(`/board/${id}`);
    }

    handleBoardAdd = (store, newBoard) => {
        let data = store.readQuery({
            query: GET_BOARDS
        });

        
        let boards = data.boards && data.boards.length ? [...data.boards, newBoard] : [newBoard];
        data = Object.assign({}, data, {boards});
        store.writeQuery({
            query: GET_BOARDS,
            data
        })
    }
          
    render() {
        const { loading, error, boards } = this.props.data;
        
        if(loading) {
            return <h1>Loading boards...</h1>;
        }

        if(error) {
            return <h1>error</h1>;
        }

        if(boards) {
            return (
                <div>
                    <CreateBoardDialog onAdd={this.handleBoardAdd} />
                    <div className="Dashboard">
                        {boards.map((board) => (
                            <Board key={board._id} board={board} onBoardSelect={this.handleBoardSelect} />)
                        )}                                        
                    </div>
                </div>
            );
        } else {
            return (
                <div>No data found</div>
            );
        }
    }
};