import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";

export async function main(_event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
  return {
    body: JSON.stringify({message: "Success"}),
    statusCode: 200,
  };
}
