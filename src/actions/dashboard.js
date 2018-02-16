import client from '../client';
import gql from 'graphql-tag';

export const getBoards = () => {
    return dispatch => {        
        client.query({
            query: gql `
                query {
                    boards {
                        _id
                        title
                    }
                }
            `
        }).then(response => {
            return dispatch({
                type: 'LOAD_BOARDS',
                data: response.data.boards
            })
        });
    }
}

export const createBoard = (title) => {
    return dispatch => {
        client.mutate({
            mutation: gql `
                mutation ($title: String!){
                    createBoard(title: $title) {
                        _id
                        title
                    }
                }
            `,
            variables: { title }
        }).then(response => {
            return dispatch({
                type: 'CREATE_BOARD',
                payload: response.data.createBoard
            });
        })
    }
}