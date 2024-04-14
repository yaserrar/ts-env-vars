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
  const client = z.object(schema.client);
  const server = z.object(schema.server);
  const isServer = typeof window === "undefined";

  const allClient = client;
  const allServer = server.merge(client);

  const parsedEnv = isServer
    ? allServer.safeParse({ ...env.server, ...env.client })
    : allClient.safeParse({ ...env.client });

  const onValidationError = (error: ZodError) => {
    console.error(
      "❌ Invalid environment variables:",
      error.flatten().fieldErrors
    );
    throw new Error("Invalid environment variables");
  };

  if (parsedEnv.success === false) {
    return onValidationError(parsedEnv.error);
  }

  const newEnv = { ...env.server, ...env.client };
  return newEnv;
};

export default createEnv;
