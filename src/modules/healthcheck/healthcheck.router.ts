import { FastifyInstance } from 'fastify';
import { getHealthcheckHandler } from '#/modules/healthcheck/healthcheck.controller.js';
import { healthCheckSchema } from '#/modules/healthcheck/healthcheck.schema.js';

export function healthcheckRouter(fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/healthcheck',
    handler: getHealthcheckHandler,
    schema: healthCheckSchema,
  });
}
