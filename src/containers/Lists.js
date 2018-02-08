import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import ListComponent from '../components/ListComponent';
import ListDialog from '../components/ListDialog';

class Lists extends Component {

    getListsToRender = () => {        
        const boardLists = this.props.boardLists.board.lists.slice();        
        return boardLists;
    };

    handleOnDelete = async (id, boardId) => {
        //console.log(store, id, boardId);       
        
        await this.props.deleteListMutation({
            variables: {
                id,
            },
            update: (store, { data: { deleteList } }) => {
                //this.props.onDelete(store, deleteList._id, this.props.boardId);
                let data = store.readQuery({
                    query: boardListQuery,
                    variables: { boardId }
                });
        
                const lists = data.board.lists.filter( item => item._id != id );
                
                store.writeQuery({ 
                    query: boardListQuery,
                    data: Object.assign({}, data, { board: { ...data.board, lists}})
                });
            },
        })
    }

    handleOnAdd = (store, list, boardId) => {
        const data = store.readQuery({
            query: boardListQuery,
            variables: { boardId }
        });

        list.tasks = [];
        list.position = data.board.lists.length + 1;

        const lists = [...data.board.lists, list];        
        store.writeQuery({ 
            query: boardListQuery,
            data: Object.assign({}, data, { board: { ...data.board, lists}})
        });
    }

    handleOnMove = async(id, position, boardId, nextPosition) => {        
        await this.props.orderListMutation({
            variables: {
                id,
                position,
                nextPosition,
                boardId
            },
            update: (store, { data: { orderList } }) => {                
                const data = store.readQuery({
                    query: boardListQuery,
                    variables: {
                        boardId
                    }
                });

                const listCount = data.board.lists.length;
                let lists = [...data.board.lists];
                nextPosition =  (nextPosition < lists[0].position) ? 
                                    listCount : 
                                (nextPosition > lists[listCount-1].position) ? 
                                    1 : 
                                    nextPosition ; 
                
                let orderedList = [];

                lists.forEach((list) => {
                    if(list.position >= position && list.position <= nextPosition) {
                        list.position = (list._id == id) ? 
                                            nextPosition : 
                                            list.position - 1;                    
                    } else if(list.position <= position && list.position >= nextPosition) {
                        list.position = (list._id == id) ? 
                                            nextPosition : 
                                            list.position + 1;                    
                    }  

                    orderedList.push(list);
                });

                orderedList = orderedList.sort((l1, l2) => {
                    return l1.position > l2.position;
                });

                store.writeQuery({
                    query: boardListQuery,
                    data: Object.assign({}, data, { board: { ...data.board, lists: orderedList }})
                });
            }
        });

    }

    handleTaskAdd = async(title, description, listId, boardId) => {
        console.log(title, description, listId, boardId);
        await this.props.createTaskMutation({
            variables: {
                title,
                description,
                listId
            },
            update: (store, { data: { createTask }}) => {
                const data = store.readQuery({
                    query: boardListQuery,
                    variables: {
                        boardId
                    }
                });

                data.board.lists.reduce((acc, next) => {
                    if(next._id == listId) {
                        (next.tasks || []).push(createTask);
                    }
                    acc.push(next);
                    return acc;
                }, []);

                store.writeQuery({
                    query: boardListQuery,
                    data
                });
            }
        });
    }

    render() {
        if (this.props.boardLists && this.props.boardLists.loading) {
          return <div>Loading</div>
        }
    
        if (this.props.boardLists && this.props.boardLists.error) {
          return <div>Error</div>
        }

        const listsToRender = this.getListsToRender();
        const boardId = this.props.boardLists.board._id;
        return (  
            <div>
                <div className="List-create">
                    {<ListDialog boardId={boardId} onAdd={this.handleOnAdd} />}
                </div>
                <div className="List">                
                    {listsToRender.map((list, index) => (
                        <ListComponent
                            key={list._id}                            
                            boardId={boardId}
                            index={index}
                            list={list}
                            onDelete={this.handleOnDelete}
                            onMove={this.handleOnMove}
                            onTaskAdd={this.handleTaskAdd}
                        />
                    ))}
                </div>
            </div>
        )
      }
}

const boardListQuery = gql `
    query getLists($boardId: String!){
        board(_id: $boardId) {
            _id
            title
            lists {
                _id
                title
                position
                tasks {
                    _id 
                    title
                    description
                    position                    
                    createdAt
                    updatedAt
                }
            }
        }
    }
`;

const deleteListMutation = gql `
    mutation DeleteList($id: String!) {
        deleteList(id: $id) {
            _id
            title
        }
    }
`;

const orderListMutation = gql `
    mutation OrderList($id: String!, $position: Int!, $nextPosition: Int!, $boardId: String!){
        orderList(id: $id, position: $position, nextPosition: $nextPosition, boardId: $boardId) 
    }
`;

const addTaskMutation = gql `
    mutation CreateTask($title: String!, $description: String!, $listId: String!) {
        createTask(title: $title, description: $description, listId: $listId) {
            _id,
            title,
            description,
            createdAt,
            updatedAt,
            position
        }
    }
`;

export default compose(
    graphql(boardListQuery, {
            name: 'boardLists',
            options: ownProps => {
              const boardId = ownProps.match.params.id;
              return {
                variables: { boardId },
              }
            },
    }),
    graphql(deleteListMutation, { name: 'deleteListMutation' }),
    graphql(orderListMutation, { name: 'orderListMutation' }),
    graphql(addTaskMutation, { name: 'createTaskMutation'})
)(Lists);

