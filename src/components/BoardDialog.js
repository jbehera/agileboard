import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class BoardDialog extends Component {
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
    await this.props.postMutation({
      variables: {
        title
      },
      update: (store, { data: { createBoard }}) => {
        this.props.onAdd(store, createBoard);
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
        <FlatButton label="Create Board" onClick={this.handleOpen} />
        <Dialog
          title="Create Board"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <TextField 
            fullWidth={false}
            id="boardTitle"
            hintText="Enter board title...."
            onChange={this.handleOnChange} />
        </Dialog>
      </div>
    );
  }
};

const createBoardMutation = gql `
  mutation PostMutation($title: String!){
    createBoard(title: $title) {
      _id
      title
      
    }
  }
`;
export default graphql(createBoardMutation, { name: "postMutation"})(BoardDialog);