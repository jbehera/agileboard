import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { BOARD_LISTS_QUERY } from '../containers/Lists';

class ListDialog extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      open: false, 
      title: '' 
    };
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleOnChange = (e) => {
    this.setState({ title: e.target.value });
  }

  handleSubmit = async() => {
    const { title } = this.state;
    const { boardId } = this.props;
    await this.props.createList({
      variables: {
        boardId,
        title
      },      
      update: (store, { data: { createList }}) => {
        createList.tasks = [];
        this.props.onAdd(store, createList, boardId);
      }
    });
    
    this.setState({open: false});
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleSubmit}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Create List" onClick={this.handleOpen} />
        <Dialog
          title="Create List"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <TextField 
            fullWidth={true}
            id="listTitle"
            hintText="Enter list title...."
            onChange={this.handleOnChange} />
        </Dialog>
      </div>
    );
  }
};

const createListMutation = gql `
    mutation CreateList($boardId: String!, $title: String!){
        createList(boardId: $boardId, title: $title) {
            _id
            title
        }
    }
`;
export default graphql(createListMutation, { name: "createList"})(ListDialog);