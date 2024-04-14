import { ZodType, z } from "zod";

const createEnv = <
  TS extends { [key: string]: ZodType<any> },
  TC extends { [key: string]: ZodType<any> }
>(
  schema: z.ZodObject<{
    server: z.ZodObject<TS>;
    client: z.ZodObject<TC>;
  }>,
  env: {
    server: { [K in keyof TS]: any };
    client: { [K in keyof TC]: any };
  }
) => {
  const parsedEnv = schema.parse(env);
  return parsedEnv;
};

export default createEnv;
