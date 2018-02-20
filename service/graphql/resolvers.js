import mongoose, { mongo } from "mongoose";
const ObjectId = new mongoose.Types.ObjectId;
import { Board, List, Task } from '../db/models';

export default {
    Query: {        
        board: async(parent, args) => {
            return await Board.findOne(args);
        },
        boards: async(parent, args) => {
            return await Board.find({});
        },
        list: async(parent, args) => {
            return await List.findOne(args);
        },
        task: async(parent, args) => {
            return await Task.findOne(args);
        }
    },    
    Board: {        
        lists: async(args) => {
            let lists = await List.find({ boardId: args._id });
            
            // sort the lists as in board.list ids
            let boardLists = await Board.find({ _id: new mongoose.Types.ObjectId(args._id)}, { lists: 1, _id: 0});
            let listIds = boardLists[0].lists;

            lists = lists.sort((l1, l2) => {
                return listIds.indexOf(l1._id) > listIds.indexOf(l2._id);
            });

            return lists;
        }
    },
    List: {
        tasks: async (args) => {
            let tasks = await Task.find({ listId: args._id });             

            // sort the tasks as in list.tasks ids
            let listTasks = await List.find({ _id: new mongoose.Types.ObjectId(args._id) }, { tasks: 1, _id: 0});
            let taskIds = listTasks[0].tasks;

            tasks = tasks.sort((t1, t2) => {
                return taskIds.indexOf(t1._id) > taskIds.indexOf(t2._id);
            });

            return tasks;          
        }
    },
    Mutation: {        
        createBoard: async (parent, args) => {
            const board = await new Board({
                _id: new mongoose.Types.ObjectId(),
                ...args
            }).save();
            return board;
        },
        createList: async (parent, args) => {
            const list = await new List({
                _id: new mongoose.Types.ObjectId(),
                ...args
            }).save();

            await Board.findOneAndUpdate({
                _id: new mongoose.Types.ObjectId(args.boardId)
            }, {
                $push : { lists: list._id }
            }, (err) => {
                if(err) throw err;
            });
            
            return list;
        },
        updateList: async(parent, args) => {
            await List.update({
                _id: new mongoose.Types.ObjectId(args.id)
            }, {
                $set: { title: args.title }
            }, (err) => {
                if(err) throw err;
            });

            const list = await List.findById(args.id);
            return list;
        },
        deleteList: async(parent, args) => {
            const list = await List.findById(args.id);
            // remove tasks
            await Task.remove({ listId: args.id });

            // update lists under board - remove id of the list from board.lists array
            await Board.update({
                _id: new mongoose.Types.ObjectId(list.boardId)
            }, {
                $pullAll: { lists: [list._id] }
            }, (err) => {
                if(err) throw err;
            });

            // remove list
            await List.remove({ _id: new mongoose.Types.ObjectId(args.id) });
            return list;
        },        
        orderList: async (parent, args) => {
            // find array of board.lists
            const boardLists = await Board.find({
                _id: new mongoose.Types.ObjectId(args.boardId)
            }, { lists: 1, _id: 0});
            // Update array with correct order
            let lists = boardLists[0].lists;
            const item = lists.splice(--args.position, 1);
            lists.splice(--args.nextPosition, 0, ...item);

            // Save the new board.lists
            await Board.update({
                _id: new mongoose.Types.ObjectId(args.boardId)
            }, { $set: { lists }}, (err) => {
                if(err) throw err;
            });

            return true;
        },
        createTask: async (parent, args) => {
            // Create task
            const task = await new Task({
                _id: new mongoose.Types.ObjectId(),
                ...args
            }).save();

            // Update list.tasks array with new task's id
            await List.findOneAndUpdate({
                _id: mongoose.Types.ObjectId(args.listId)
            }, {
                $push: { tasks: task._id }
            }, (err) => {
                if(err) throw err;
            });

            return task;
        },
        orderTasks: async (parent, args) => {
            const listTasks = await List.find({ 
                _id: new mongoose.Types.ObjectId(args.listId)
            }, {tasks: 1, _id: 0} );

            let tasks = listTasks[0].tasks;
            let item = tasks.splice(--args.position, 1);
            tasks.splice(--args.nextPosition, 0, ...item);

            await List.update({ 
                _id: new mongoose.Types.ObjectId(args.listId)
            }, { $set: { tasks } }, (err) => {
                if(err) throw err;
            })

            return true;
        },
        updateTask: async(parent, args) => {
            await Task.update({
                _id: new mongoose.Types.ObjectId(args.id)
            }, {
                $set: { title: args.title, description: args.description }
            }, (err) => {
                if(err) throw err;
            });

            const task = await Task.findById(args.id);
            return task;
        },
        deleteTask: async(parent, args) => {
            const task = await Task.findById(args.id);
            // update list.tasks - remove id of the list.tasks array
            await List.update({
                _id: new mongoose.Types.ObjectId(task.listId)
            }, { $pullAll: { tasks: [task._id] } }, (err) => {
                if(err) throw err;
            });

            // remove task
            await Task.remove({_id: new mongoose.Types.ObjectId(args.id)});
            return task;
        }
    }
};