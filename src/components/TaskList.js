import React, { PureComponent } from 'react';
import SelectBox from './SelectBox';

import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';



class TaskList extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            newTask: false,
            title: '',
            description: ''
        }
    }

    toggleNewTask = () => {
        this.setState((state)=>({
            newTask: !state.newTask,
            title: '',
            description: ''
        }));
    }

    onTitleChange = (e) => {
        this.setState({ title: e.target.value });
    }

    onDescriptionChange = (e) => {
        this.setState({ description: e.target.value });
    }

    onSave = (e) => {
        //this.props.onListAdd(this.state.title);
        const listId = e.currentTarget.dataset.id;
        this.props.onTaskAdd(this.state.title, this.state.description, listId);
        this.toggleNewTask();
    }

    onMove = (next, prev) => {
        this.props.onMove(prev, next);
    }

    onRemove = (e) => {
        const id = e.currentTarget.dataset.id;
        this.props.onRemove(id);
    }

    render() {
        const { children, id, title, count, position } = this.props;
        return(
            <div style={styles.taskList}>
                <List>
                    <Subheader style={styles.listHeader}>
                        <div>{title}</div>
                        <div style={styles.listHeader.buttons}>
                            <FlatButton label="Add" onClick={this.toggleNewTask}/>                            
                            <label style={styles.move}>
                                Move: 
                                <SelectBox 
                                    options={[...Array(count).keys()].map(i => i + 1)} 
                                    onChange={this.onMove} 
                                    selectedValue={position} />
                            </label>
                            <FlatButton label="Remove" data-id={id} secondary={true} onClick={this.onRemove} />
                        </div>
                    </Subheader>
                    <Divider/>
                    {this.state.newTask && (
                        <div>
                            <div style={styles.form}>
                                <div style={styles.fields}>
                                    <TextField hintText="title" value={this.state.title} onChange={this.onTitleChange}/><br/>
                                    <TextField hintText="description" value={this.state.description} onChange={this.onDescriptionChange}/>
                                    <div>
                                        <FlatButton label="Save" primary={true} data-id={id} onClick={this.onSave}/>
                                        <FlatButton label="Cancel" onClick={this.toggleNewTask}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {React.Children.map(children, (child, i) =>
                        React.cloneElement(child)
                    )}
                </List>
            </div>
        );
    }
}

class TaskCard extends PureComponent {

    onRemove = (e) => {
        this.props.onRemove(e.currentTarget.dataset.id, this.props.listId);
    }

    onMove = (next, prev) => {
        this.props.onMove(prev, next, this.props.listId);
    }
    
    render() {
        const { title, description, count, position, createdAt, updatedAt } = this.props;
        return(
            <div>
                <ListItem 
                    primaryText={
                        <div style={styles.listHeader}>
                            <div>{title}</div>
                            <div style={styles.listHeader.buttons}>                                
                                <label style={styles.move}>
                                    Move: 
                                    <SelectBox 
                                        options={[...Array(count).keys()].map(i => i + 1)} 
                                        onChange={this.onMove} 
                                        selectedValue={position}/>
                                </label>
                                <FlatButton label="Remove" data-id={this.props.id} secondary={true} onClick={this.onRemove}/>
                            </div>
                        </div>
                    }
                    secondaryText={
                        <p>{description} <br/> Updated: <strong>{new Date(updatedAt).toLocaleString()}</strong></p>
                    }
                    secondaryTextLines={2} />
            </div>
        )
    }
}

export { TaskList, TaskCard };

const styles = {
    taskList: {
        width: '30%',
        border: '1px solid rgb(217, 217, 217)',
        borderImage: 'initial',
        margin: '20px'
    },
    listHeader: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        buttons: {
            marginRight: '10px'
        }
    },
    newTask: {
        paddingLeft: '10px',
        marginTop: '10px'
    },
    form: {
        border: '1px solid #ccc',
    },
    fields: {
        margin: '5px 10px'
    },
    move: {
        margin: '10px'
    }
}