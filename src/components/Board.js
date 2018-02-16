import React from 'react';
import './styles/Board.css';

export const Board = ({board, ...props}) => {
    return (
        <div className="Board" data-id={board._id} onClick={props.onBoardClick}>
            <label className="Board-title">{board.title}</label>
        </div>
    );
};