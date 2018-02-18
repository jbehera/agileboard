import React, { Component } from 'react';
import { TaskList, TaskCard } from './TaskList';


import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

export default class TaskLists extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newList: true,
            title: ''
        }
    }

    toggleNewList = () => {
        this.setState((state)=>({
            newList: !state.newList,
            title: ''
        }));
    }

    onTitleChange = (e) => {
        this.setState({ title: e.target.value });
    }

    onSave = () => {
        this.props.onListAdd(this.state.title);
        this.toggleNewList();
    }

    renderTaskCards = (tasks, listId) => {
        const { onTaskRemove, onTaskMove } = this.props;
        const count = tasks.length;
        return(
            <div>
                { tasks.map((task, index) => (
                    <TaskCard 
                        key={task._id}
                        id={task._id}
                        listId={listId} 
                        title={task.title} 
                        description={task.description}
                        count={count}
                        position={++index}
                        createdAt={task.createdAt}
                        updatedAt={task.updatedAt}
                        onRemove={onTaskRemove}
                        onMove={onTaskMove}
                        />)
                    ) }
            </div>
        )
    }
    
    render() {
        const { data, onListRemove, onListMove, onTaskAdd } = this.props;
        const count = data && data.length;
        return (
            <div>
                <div style={styles.newList}>
                    {this.state.newList && (<RaisedButton label="Add List" onClick={this.toggleNewList}/>)}
                    {this.state.newList || (<div style={styles.form}>
                        <div style={styles.fields}>
                            <TextField hintText="title" value={this.state.title} onChange={this.onTitleChange}/>
                            <div>
                                <FlatButton label="Save" primary={true} onClick={this.onSave}/>
                                <FlatButton label="Cancel" onClick={this.toggleNewList}/>
                            </div>
                        </div>
                    </div>)}
                </div>
                <div style={styles.taskLists}>
                    { data.map((list, index) => (
                        <TaskList 
                            key={list._id} 
                            id={list._id} 
                            title={list.title}
                            count={count}
                            position={++index}                            
                            onRemove={onListRemove}
                            onMove={onListMove}
                            onTaskAdd={onTaskAdd}>
                            {this.renderTaskCards(list.tasks, list._id)}
                        </TaskList>)
                    )}
                </div>
            </div>
        )
    }
}

const styles = {
    taskLists: {
        display: 'flex',
        alignItems: 'top',
        justifyContent: 'flex-start',    
        flex: 1,
        flexWrap: 'wrap'
    },
    newList: {
        paddingLeft: '20px',
        marginTop: '20px'
    },
    form: {
        width: '30%',
        border: '1px solid #ccc',
    },
    fields: {
        margin: '5px 10px'
    }
};