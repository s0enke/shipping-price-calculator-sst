import { Api, RemixSite, Config } from "@serverless-stack/resources";

export function MyStack({ stack }) {
  const api = new Api(stack, "api", {
    routes: {
      "GET /": "functions/lambda.handler",
    },
  });
  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  new Config.Parameter(stack, "API_URL", {
    value: api.url,
  });

  const site = new RemixSite(stack, "Site", {
    path: "web/",
    environment: {
      API_URL: api.url,
    },
  });
}
