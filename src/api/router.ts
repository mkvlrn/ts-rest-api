import { FastifyInstance } from 'fastify';
import { getHealthcheckHandler } from '#/modules/healthcheck/healthcheck.controller.js';
import { healthCheckSchema } from '#/modules/healthcheck/healthcheck.schema.js';

export async function router(fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/healthcheck',
    schema: healthCheckSchema,
    handler: getHealthcheckHandler,
  });
}
