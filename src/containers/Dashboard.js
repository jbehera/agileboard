import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Dashboard from '../components/Dashboard';


export const GET_BOARDS = gql `
    query GetBoards {        
        boards {
            _id
            title
        }        
    }
`;

export default 
    graphql(GET_BOARDS)(connect( 
        state => {            
            return {
                
            }
        }, 
        ((dispatch, ownProps) => ({
            loadBoards: (boards) => {
                console.log(boards);
            }
        }))
)(Dashboard));