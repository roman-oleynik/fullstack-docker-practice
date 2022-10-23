const config = require('../../db/config');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const TABLE_TODOS = config.aws_table_name;

AWS.config.update(config.aws_remote_config);
const dynamoClient = new AWS.DynamoDB.DocumentClient();

const getTodos = async (req, res) => {
  const params = {
    TableName: config.aws_table_name
  };

  const todos = await dynamoClient.scan(params).promise()
  return todos;
};

const addTodo = async (todo) => {
  const payload = { ...todo, todoId: todo.todoId || uuidv4() }
  const params = {
    TableName: TABLE_TODOS,
    Item: payload
  }

  await dynamoClient.put(params).promise();
  return {Item: {...payload}};
}

const getTodoById = async (todoId) => {
  const params = {
    TableName: TABLE_TODOS,
    Key: {
      todoId
    }
  }
  const todo = await dynamoClient.get(params).promise();
  return todo;
}

const deleteTodo = async (todoId) => {
  const  params = {
      TableName: TABLE_TODOS,
      Key: {
        todoId
      }
  }

  return await dynamoClient.delete(params).promise()
}

//export our functions to be used for our api
module.exports = {
  dynamoClient,
  getTodos,
  addTodo,
  getTodoById,
  deleteTodo
}