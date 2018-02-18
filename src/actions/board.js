import client from "../client";
import gql from "graphql-tag";

export const getBoard = (boardId) => {
    return dispatch => { 
        client.query({
            query: gql `
                query ($boardId: String!){
                    board(_id: $boardId) {
                        _id
                        title
                        lists {
                            _id
                            title
                            tasks {
                                _id
                                title
                                description
                                createdAt
                                updatedAt
                            }
                        }
                    }
                } 
            `,            
            variables: {
                boardId
            }            
        }).then(response => {
            return dispatch({
                type: 'LOAD_BOARD',
                data: response.data
            })
        });
    }
};

export const createList = (title, boardId) => {
    return dispatch => {
        client.mutate({
            mutation: gql `
                mutation ($title: String!, $boardId: String!) {
                    createList(title: $title, boardId: $boardId) {
                        _id
                        title 
                        tasks {
                            _id
                            title
                            description
                            createdAt
                            updatedAt
                        }
                    }
                }
            `,
            variables: { 
                title, 
                boardId
            }
        }).then(response => {
            return dispatch({
                type: 'CREATE_LIST',
                payload: response.data
            })
        });
    };
};

export const updateList = (id, title) => {
    return dispatch => {
        client.mutate({
            mutation: gql `
                mutation ($id: String!, $title: String!) {
                    updateList(id: $id, title: $title) {
                        _id
                        title
                        tasks {
                            _id
                            title
                            description
                            createdAt
                            updatedAt
                        }
                    }
                }
            `,
            variables: { id, title }
        }).then(response => {
            return dispatch({
                type: 'UPDATE_LIST',
                payload: response.data
            });
        },(err) => {
            console.log(err);
        });
    }
};

export const deleteList = (id) => {
    return dispatch => {
        client.mutate({
            mutation: gql `
                mutation ($id: String!) {
                    deleteList(id: $id) {
                        _id
                        title
                        boardId
                    }
                }
            `,
            variables: { id }
        }).then(response => {
            return dispatch({
                type: 'DELETE_LIST',
                payload: response.data
            })
        });
    }
};

export const orderLists = (position, nextPosition, boardId) => {
    return dispatch => {
        client.mutate({
            mutation: gql `
                mutation ($position: Int!, $nextPosition: Int!, $boardId: String!) {
                    orderList(position: $position, nextPosition: $nextPosition, boardId: $boardId) 
                }
            `,
            variables: { position, nextPosition, boardId }
        }).then(response => {
            return dispatch({
                type: 'ORDER_LISTS',
                payload: { position, nextPosition, data: response.data }
            });
        });
    }
};

export const createTask = (title, description, listId) => {
    return dispatch => {
        client.mutate({
            mutation: gql `
                mutation ($title: String!, $description: String!, $listId: String!) {
                    createTask (title: $title, description: $description, listId: $listId) {
                        _id,
                        title,
                        description,
                        createdAt,
                        updatedAt
                    }
                }
            `,
            variables: { title, description, listId }
        }).then(response => {
            return dispatch({
                type: 'CREATE_TASK',
                payload: { listId, newTask: response.data.createTask }
            })           
        });
    }
};

export const updateTask = (id, title, description, listId) => {
    return dispatch => {
        client.mutate({
            mutation: gql `
                mutation ($id: String!, $title: String!, $description: String!) {
                    updateTask(id: $id, title: $title, description: $description) {
                        _id
                        title
                        description
                        createdAt
                        updatedAt
                    }
                }
            `,
            variables: { id, title, description }
        }).then(response => {
            return dispatch({
                type: 'UPDATE_TASK',
                payload: { listId, task: response.data.updateTask }
            });
        },(err) => {
            console.log(err);
        });
    }
};

export const deleteTask = (id, listId) => {
    console.log('action - deleteTask: ', id, listId);
    return dispatch => {
        client.mutate({
            mutation: gql `
                mutation ($id: String!) {
                    deleteTask(id: $id) {
                        _id
                        title
                        description
                        createdAt
                        updatedAt
                    }
                }
            `,
            variables: { id }
        }).then(response => {
            return dispatch({
                type: 'DELETE_TASK',
                payload: { listId, deletedTask: response.data.deleteTask }
            }) 
        })
    };
};

export const orderTasks = (position, nextPosition, listId) => {
    return dispatch => {
        client.mutate({
            mutation: gql `
                mutation ($position: Int!, $nextPosition: Int!, $listId: String!) {
                    orderTasks(position: $position, nextPosition: $nextPosition, listId: $listId) 
                }            
            `,
            variables: { position, nextPosition, listId }

        }).then(response => {
            return dispatch({
                type: 'ORDER_TASKS',
                payload: { position, nextPosition, listId, data: response.data }
            })
        })
    }
};

