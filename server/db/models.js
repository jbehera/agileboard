import mongoose from 'mongoose';

const dbURI =  'mongodb://localhost:27017/kanban';
mongoose.connect(dbURI);

mongoose.connection.once('connected', () => {
    console.log(`MongoDB connection connection opened to: ${dbURI} - ${new Date()}`);
});

mongoose.connection.on('error', (err) => {
    console.log(`MongoDB connection error: ${err}`);
});

mongoose.connection.once('disconnected', () => {
    console.log('MongoDB disconnected');
});
  
process.on('SIGINT',() => {
    mongoose.connection.close(() => {
        console.log('MongoDB default connection disconnected through app termination');
        process.exit(0);
    });
});

const Schema = mongoose.Schema;

const boardSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: String
});

const listSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: String,
    boardId: { type: Schema.Types.ObjectId, ref: 'Board' },
    position: Number
});

const taskSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: String,
    description: String,
    listId: { type: Schema.Types.ObjectId, ref: 'List'},
    position: Number
}, { timestamps: true });

export const Board = mongoose.model('Board', boardSchema);
export const List = mongoose.model('List', listSchema);
export const Task = mongoose.model('Task', taskSchema);
