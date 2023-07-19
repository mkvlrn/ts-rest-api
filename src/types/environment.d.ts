import { z } from 'zod';

const customEnvironment = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.coerce.number(),
  DATABASE_URL: z.string(),
  SESSION_SECRET: z.string(),
  SESSION_NAME: z.string(),
  SESSION_DURATION_IN_MINUTES: z.coerce.number(),
});

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof customEnvironment> {}
  }
}
