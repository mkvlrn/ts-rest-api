import { FastifySchema } from 'fastify';
import { z } from 'zod';

const healcheckResponse200 = z.object({
  healthy: z.boolean(),
  message: z.string().optional(),
});

export type HealthCheckResponse = z.infer<typeof healcheckResponse200>;

export const healthCheckSchema: FastifySchema = {
  response: {
    200: healcheckResponse200,
  },
};
