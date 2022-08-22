import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamodbClient";


export const handler: APIGatewayProxyHandler = async (event) => {
  const { userId } = event.pathParameters;

  const response = await document.scan({
    TableName: "todos",
    ExpressionAttributeValues: {
      ":userId": userId
    },
    FilterExpression: "userId = :userId"
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(response.Items)
  };
};

