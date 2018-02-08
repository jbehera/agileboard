import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import DataComponent from '../data';

export const getBoards = () => {
    return dispatch => {
        debugger;
        const response = graphql(
            gql `
                query GetBoards {
                    user(_id: "5a75c98cdc5e41244c81c35d") {
                        boards {
                            _id
                            title
                        }
                    }
                }
            `,
            { name: 'getBoardData'}
        );

        console.log(response);
        return true;
    }
}