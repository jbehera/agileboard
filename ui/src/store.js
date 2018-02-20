import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { apolloReducer } from 'apollo-cache-redux';
import thunk from 'redux-thunk';
import boardsReducer from './reducers/boards';
import boardReducer from './reducers/board';

const reducers = combineReducers({
  apollo: apolloReducer,
  boards: boardsReducer,
  board: boardReducer
});

const store = applyMiddleware(thunk)(createStore)(reducers);

export default store;