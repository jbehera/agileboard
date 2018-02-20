import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBoards, createBoard } from '../actions/dashboard';
import { Board } from '../components/Board';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const styles = {
    dashboard: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',    
        flex: 1,
        flexWrap: 'wrap'
    },
    newBoard: {
        paddingLeft: '20px',
        marginTop: '20px'
    },
    form: {
        width: '20%',
        border: '1px solid #ccc',
    },
    fields: {
        margin: '5px 10px'
    }
};

class DashboardContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newBoard: true,
            title: ''
        }
    }

    componentDidMount () {
        this.props.getBoards();
    }

    onBoardClick = (e) => {
        const id = e.target.dataset.id;
        this.props.history.push(`/board/${id}`);
    }

    toggleNewBoard = () => {
        this.setState((state)=>({
            newBoard: !state.newBoard,
            title: ''
        }));
    }

    onTitleChange = (e) => {
        this.setState({ title: e.target.value });
    }

    onSave = () => {
        this.props.createBoard(this.state.title);
        this.toggleNewBoard();
    }

    render() {
        if(!this.props.boards) 
            return (<div>Loading...</div>);
        return (
            <div>                
                <div style={styles.newBoard}>
                    {this.state.newBoard && (<RaisedButton label="Create Board" onClick={this.toggleNewBoard}/>)}
                    {this.state.newBoard || (<div style={styles.form}>
                        <div style={styles.fields}>
                            <TextField hintText="title" value={this.state.title} onChange={this.onTitleChange}/>
                            <div>
                                <FlatButton label="Save" primary={true} onClick={this.onSave}/>
                                <FlatButton label="Cancel" onClick={this.toggleNewBoard}/>
                            </div>
                        </div>
                    </div>)}
                </div>
                <div style={styles.dashboard}>                
                    {this.props.boards.map(board => <Board key={board._id} board={board} onBoardClick={this.onBoardClick} />)}
                </div>
            </div>
        )
    }
}

export default connect(state => {
    return {        
        boards: state.boards.boards
    }
}, (dispatch) => ({
    getBoards: () => {
        dispatch(getBoards());
    },
    createBoard: (title) => {
        dispatch(createBoard(title));
    }
}))(DashboardContainer);