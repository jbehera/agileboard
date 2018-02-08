import React, { Component } from 'react';
import './styles/Board.css';

export default class Board extends Component {

    handleBoardClick = () => {
        this.props.onBoardSelect(this.props.board._id);
    }
    
    render() {
        const { board } = this.props;
        return (
            <div className="Board" onClick={this.handleBoardClick}>
                <label className="Board-title">{board.title}</label>
            </div>
        );
    }
};