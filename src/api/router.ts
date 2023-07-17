import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { ResourceNotFound } from '#/api/custom-errors.js';
import { getHealthcheckHandler } from '#/modules/healthcheck/healthcheck.controller.js';
import { healthCheckSchema } from '#/modules/healthcheck/healthcheck.schema.js';

async function catchAllRoute(request: FastifyRequest, _reply: FastifyReply) {
  const { url, method } = request;

  throw new ResourceNotFound(`${method}:${url}`);
}

export async function router(fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/healthcheck',
    schema: healthCheckSchema,
    handler: getHealthcheckHandler,
  });

  fastify.route({
    method: 'GET',
    url: '*',
    handler: catchAllRoute,
  });

  fastify.route({
    method: 'POST',
    url: '*',
    handler: catchAllRoute,
  });

  fastify.route({
    method: 'PUT',
    url: '*',
    handler: catchAllRoute,
  });

  fastify.route({
    method: 'PATCH',
    url: '*',
    handler: catchAllRoute,
  });

  fastify.route({
    method: 'DELETE',
    url: '*',
    handler: catchAllRoute,
  });
}
