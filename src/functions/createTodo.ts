import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamodbClient";

interface ICreateTodo {
  id: string;
  title: string;
  deadline: Date;
}

export const handler: APIGatewayProxyHandler = async (event) => {
  const { userId } = event.pathParameters;
  const { id, title, deadline } = JSON.parse(event.body) as ICreateTodo;

  await document.put({
    TableName: "todos",
    Item: {
      id,
      userId,
      title,
      done: false,
      deadline: new Date(deadline).getTime(),
      created_at: new Date().getTime()
    }
  }).promise();


  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "To-do created"
    })
  };
}; 