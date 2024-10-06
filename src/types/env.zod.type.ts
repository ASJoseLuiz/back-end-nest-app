import { z } from "zod";

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_PRIVATE_KEY: z.string(),
  PORT: z.string().transform(Number).optional(),
});

export type Env = z.infer<typeof envSchema>;
