# ts-env-vars

## Description

**ts-env-vars** is an npm package that provides a typesafe way to handle environment variables in Next.js projects. It utilizes the Zod library for runtime type checking and validation.

## Installation

`npm i ts-env-vars`

## Usage

```ts
import { z } from "zod";
import createEnv from "ts-env-vars";

// Define your environment variables schema
const schema = {
  server: {
    // Define server-side environment variables and their types using Zod
    PORT: z.string(),
    API_URL: z.string().url(),
  },
  client: {
    // Define client-side environment variables and their types using Zod
    NEXT_PUBLIC_ENABLE_ANALYTICS: z.boolean(),
  },
};

// Provide your environment variables
const env = {
  server: {
    PORT: process.env.PORT,
    API_URL: process.env.API_URL,
  },
  client: {
    NEXT_PUBLIC_ENABLE_ANALYTICS: process.env.ENABLE_ANALYTICS,
  },
};

// Create typed environment variables
const typedEnv = createEnv(schema, env);

// Use typedEnv in your Next.js application
console.log(typedEnv);
```

## Features

- **Type Safety:** Ensures that your environment variables match the specified types.
- **Runtime Validation:** Validates environment variables at runtime to prevent errors.
- **Server & Client Support:** Supports different environment variables for server and client-side code.
- **Easy Integration:** Simply import and use createEnv to get typed environment variables.

## License

This project is licensed under the MIT License
