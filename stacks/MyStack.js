import {
  Api,
  RemixSite,
  NextjsSite,
  Config,
} from "@serverless-stack/resources";
import { aws_cloudfront } from "aws-cdk-lib";

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

  const nextJsSite = new NextjsSite(stack, "NextSite", {
    path: "frontend-next/",
    environment: {
      NEXT_PUBLIC_API_URL: api.url,
    },
  });

  stack.addOutputs({
    NextjsSite: nextJsSite.url,
  });
}
