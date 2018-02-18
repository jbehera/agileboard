import { orderItemsInArray } from '../helpers';

export default (state = {
    
  }, action) => { 
    //let board, list, updatedLists, position, nextPosition, data, listId, task;    
    switch (action.type) {
      case 'LOAD_BOARD':
        let board = action.data;
        return Object.assign({}, state, board);

      case 'CREATE_LIST': 
        const newList = action.payload.createList;
        let newLists = state.board.lists ? [...state.board.lists, newList] : [newList];
        return Object.assign(
          {}, state, { board : { ...state.board, lists: newLists	} } 
        );

      case 'DELETE_LIST': 
        const deletedList = action.payload.deleteList;
        let remainingLists = state.board.lists.filter(list => list._id != deletedList._id);
        return Object.assign(
          {}, state, { board : { ...state.board, lists: remainingLists	} } 
        );

      case 'ORDER_LISTS':
        let { position, nextPosition, data } = action.payload;
        if(data) {
          let orderedList = orderItemsInArray(position, nextPosition, [...state.board.lists]);
          return Object.assign(
            {}, state, { board : { ...state.board, lists: orderedList	} } 
          );
        } else {
          return state;
        }

      case 'CREATE_TASK':
        let { listId, newTask } = action.payload;

        let updatedListsWithNewTask = [...state.board.lists].reduce((acc, next, i) => {
            if(next._id == listId) {                
                let item = Object.assign({}, next);
                item.tasks = next.tasks ? [...next.tasks, newTask] : [newTask];
                acc.push(item);
            } else {
              acc.push(next);
            }
            return acc;
        }, []);

        return Object.assign(
          {}, state, { board : { ...state.board, lists: updatedListsWithNewTask	} } 
        );

      case 'DELETE_TASK':
        let { deletedTask } = action.payload;
        listId= action.payload.listId;

        let updatedListsWithRemovedTask = [...state.board.lists].reduce((acc, next) => {
            if(next._id == listId) {
                let item = Object.assign({}, next);
                item.tasks = next.tasks.filter(task => task._id !== deletedTask._id);
                acc.push(item);
            } else {
              acc.push(next);
            }
            return acc;
        }, []);

        return Object.assign(
          {}, state, { board : { ...state.board, lists: updatedListsWithRemovedTask	} } 
        );

      case 'ORDER_TASKS':
        //let { position, nextPosition, listId, response } = action.payload;
        position = action.payload.position;
        nextPosition = action.payload.nextPosition;
        listId = action.payload.listId;
        data = action.payload.data; 
        if(data) {
          let list = state.board.lists.find(list => list._id == listId);
          if(list && list.tasks && list.tasks.length) {
            let orderedTasks = orderItemsInArray(position, nextPosition, [...list.tasks]);

            let listsWithOrderedTasks = [...state.board.lists].reduce((acc, next) => {
              if(next._id == listId) {
                //next.tasks = orderedTasks;
                let item = Object.assign({}, next);
                item.tasks = orderedTasks;
                acc.push(item);
              } else {
                acc.push(next);
              }
              return acc;
            }, []); 
            
            return Object.assign(
              {}, state, { board : { ...state.board, lists: listsWithOrderedTasks	} } 
            );
          }          
        } 

        return state;
       
      default:
        console.log(action);
        return state;
    }
  };
  