import { ZodType, z } from "zod";

const createEnv = <
  TS extends { [key: string]: ZodType<any> },
  TC extends { [key: string]: ZodType<any> }
>(
  schema: {
    server: { [key: string]: ZodType<any> };
    client: { [key: string]: ZodType<any> };
  },
  env: {
    server: { [K in keyof TS]: any };
    client: { [K in keyof TC]: any };
  }
) => {
  const _client = typeof schema.client === "object" ? schema.client : {};
  const _server = typeof schema.server === "object" ? schema.server : {};
  const client = z.object(_client);
  const server = z.object(_server);
  const isServer = typeof window === "undefined";

  const allClient = client;
  const allServer = server.merge(client);

  const parsedEnv = isServer
    ? allServer.parse({ ...env.server, ...env.client })
    : allClient.parse({ ...env.client });

  return parsedEnv;
};

export default createEnv;
