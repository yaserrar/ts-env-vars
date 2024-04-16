import { ZodError, ZodType, z } from "zod";

const createEnv = <
  TS extends { [key: string]: ZodType<any> },
  TC extends { [key: string]: ZodType<any> }
>(
  schema: {
    server: TS;
    client: TC;
  },
  env: {
    server: { [K in keyof TS]: any };
    client: { [K in keyof TC]: any };
  }
) => {
  // Create Zod object schemas for server and client environments

  const client = z.object(schema.client);
  const server = z.object(schema.server);

  // Check if code is running on the server or client side
  const isServer = typeof window === "undefined";

  // Merge client and server schemas for server-side validation
  const allClient = client;
  const allServer = server.merge(client);

  // Validate environment variables based on the context (server or client)
  const parsedEnv = isServer
    ? allServer.safeParse({ ...env.server, ...env.client })
    : allClient.safeParse({ ...env.client });

  // Error handling function
  const onValidationError = (error: ZodError) => {
    console.error(
      "❌ Invalid environment variables:",
      error.flatten().fieldErrors
    );
    throw new Error("Invalid environment variables");
  };

  // Handle validation errors
  if (parsedEnv.success === false) {
    return onValidationError(parsedEnv.error);
  }

  // If validation succeeds, return the merged environment variables
  const newEnv = { ...env.server, ...env.client };
  return newEnv;
};

export default createEnv;
