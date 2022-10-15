export const handler = async (event) => {
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
body: `Hello, World! ba Your request was received at ${event.requestContext.time}.`,
  };
};
