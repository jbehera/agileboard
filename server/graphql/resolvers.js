import mongoose from "mongoose";
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
            const lists = await List.find({ boardId: args._id }, {}, {$order: {position: 1}});           
            return lists;
        }
    },
    List: {
        tasks: async (args) => {
            const tasks = await Task.find({listId: args._id}, {}, {$order: {position: 1}});             
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
            let position = await List.count({ boardId: args.boardId });
            args.position = position + 1;            
            const list = await new List({
                _id: new mongoose.Types.ObjectId(),
                ...args
            }).save();
            
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
            await Task.remove({ listId: args.id });
            await List.remove({ _id: new mongoose.Types.ObjectId(args.id) });
            return list;
        },
        // orderList: async (parent, args) => {            
        //     const lists = await List.find({_id: { 
        //         "$in": [args.listId1, args.listId2]
        //     }}).select({ "_id": 1, "position": 1});

        //     await List.findOneAndUpdate({
        //         _id: new mongoose.Types.ObjectId(lists[0]._id)
        //     }, {
        //         "$set": { "position" : lists[1].position }
        //     }, (err) => {
        //         if(err) throw err;
        //     });

        //     await List.findOneAndUpdate({
        //         _id: new mongoose.Types.ObjectId(lists[1]._id)
        //     }, {
        //         "$set": { "position" : lists[0].position }
        //     }, (err) => {
        //         if(err) throw err;
        //     });

        //     return true;
        // },  
        orderList: async (parent, args) => {
            let curPos = args.position;
            let nextPos = args.nextPosition;

            const lists = await List.find({
                    boardId: new mongoose.Types.ObjectId(args.boardId)
                }, {                    
                }, { $order: { position: 1 }}, 
                (err, lists) => {
                    lists.forEach((list) => {
                        if(list.position >= curPos && list.position <= nextPos) {
                            list.position = (list._id == args.id) ? 
                                                nextPos : 
                                                list.position - 1;                    
                            list.save();
                        } else if(list.position <= curPos && list.position >= nextPos) {
                            list.position = (list._id == args.id) ? 
                                                nextPos : 
                                                list.position + 1;                    
                            list.save();
                        }                    
                    });
                }
            );

            return true;
        },
        createTask: async (parent, args) => {
            let position = await Task.count({ listId: args.listId });
            args.position = position + 1;   
            const task = await new Task({
                _id: new mongoose.Types.ObjectId(),
                ...args
            }).save();

            return task;
        },
        orderTasks: async(parent, args) => {
            const tasks = await Task.find({_id: { 
                "$in": [args.taskId1, args.taskId2]
            }}).select({ "_id": 1, "position": 1});

            console.log(tasks);
            await Task.findOneAndUpdate({
                _id: new mongoose.Types.ObjectId(tasks[0]._id)
            }, {
                "$set": { "position" : tasks[1].position }
            }, (err) => {
                if(err) throw err;
            });

            await Task.findOneAndUpdate({
                _id: new mongoose.Types.ObjectId(tasks[1]._id)
            }, {
                "$set": { "position" : tasks[0].position }
            }, (err) => {
                if(err) throw err;
            });

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
            await Task.remove({_id: new mongoose.Types.ObjectId(args.id)});
            return task;
        }
    }
};