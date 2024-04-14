import { ZodType, z } from "zod";

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
    ? allServer.parse({ ...env.server, ...env.client })
    : allClient.parse({ ...env.client });

  const newEnv = { ...env.server, ...env.client };
  return newEnv;
};

export default createEnv;
