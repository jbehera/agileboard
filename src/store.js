import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { apolloReducer } from 'apollo-cache-redux';
import thunk from 'redux-thunk';
import boardReducer from './reducers/boards';

//const store = createStore(
  const reducers = combineReducers({
    apollo: apolloReducer,
    boards: boardReducer
  });
//);

const store = applyMiddleware(thunk)(createStore)(reducers);

//export default applyMiddleware(thunk)(store);

export default store;