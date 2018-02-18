import React from 'react';

const styles = {
    board: {
        height: '150px',
        width: '20%',
        margin: '20px',
        background: 'rgb(3, 169, 244)',
        boxSizing: 'border-box',
        boxShadow: 'antiquewhite',
        borderRadius: '4px',
        padding: '10px',
        cursor: 'pointer'
    },
    title: {
        color: '#ffffff',
        fontSize: '20px'
    }
}

export const Board = ({board, ...props}) => {
    return (
        <div style={styles.board} data-id={board._id} onClick={props.onBoardClick}>
            <label style={styles.title}>{board.title}</label>
        </div>
    );
};