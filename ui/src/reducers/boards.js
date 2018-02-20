export default (state = {
  boards: []
}, action) => {
  switch (action.type) {
    case 'LOAD_BOARDS':
      return Object.assign({}, state,  { boards: action.data });
    case 'CREATE_BOARD':
      let newBoard = action.payload;
      const boards = state.boards ? [...state.boards, newBoard] : [newBoard];
      return Object.assign({}, state, { boards });
    default:
      return state;
  }
};
