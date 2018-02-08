import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';

export default class Task extends Component {

    render() {
        const { task } = this.props;
        return (
            <ListItem key={task._id} 
                primaryText={task.title}
                secondaryText={<p>
                    {task.description} Updated: {task.updatedAt}
                </p>}
            />
        );
    }
};