import {
  getMostInexpensiveRate, getPossibleRates
} from "../core/calculator"
import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/json" },
    body: JSON.stringify(getPossibleRates(getMostInexpensiveRate(parseInt(event.queryStringParameters.weight_g!), parseInt(event.queryStringParameters.length_cm!), parseInt(event.queryStringParameters.width_cm!), parseInt(event.queryStringParameters.height_cm!)))),
  };
};
