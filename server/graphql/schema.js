export default `
    type Query {        
        board(_id: String!): Board
        boards: [Board]
        list(_id: String!): List
        task(_id: String!): Task
    }
   
    type Board {
        _id: String!
        title: String!
        lists: [List]
    }

    type List {
        _id: String!
        boardId: String!
        title: String!
        tasks: [Task]
        position: Int
    }

    type Task {
        _id: String!
        listId: String!        
        title: String!
        description: String!
        position: Int
        createdAt: String
        updatedAt: String
    }

    type Mutation {        
        createBoard(title: String!): Board!
        createList(title: String!, boardId: String!): List!
        updateList(id: String!, title: String!): List
        deleteList(id: String!): List
        orderList(id: String!, position: Int!, nextPosition: Int!, boardId: String!): Boolean
        createTask(title: String!, description: String!, listId: String!): Task
        orderTasks(taskId1: String!, taskId2: String!): Boolean
        updateTask(id: String!, title: String!, description: String!): Task
        deleteTask(id: String!): Task
    }

    schema {
        query: Query
        mutation: Mutation
    }
`;