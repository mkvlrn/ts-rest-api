import { FastifyInstance } from 'fastify';
import {
  signInHandler,
  signOutHandler,
  signUpHandler,
  userGate,
  whoamiHandler,
} from '#/modules/auth/auth.controller.js';
import {
  signInSchema,
  signOutSchema,
  signUpSchema,
  whoamiSchema,
} from '#/modules/auth/auth.schema.js';
import { getHealthcheckHandler } from '#/modules/healthcheck/healthcheck.controller.js';
import { healthCheckSchema } from '#/modules/healthcheck/healthcheck.schema.js';

export async function router(fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/healthcheck',
    schema: healthCheckSchema,
    handler: getHealthcheckHandler,
  });

  fastify.route({
    method: 'POST',
    url: '/auth/sign-up',
    handler: signUpHandler,
    schema: signUpSchema,
  });

  fastify.route({
    method: 'POST',
    url: '/auth/sign-in',
    handler: signInHandler,
    schema: signInSchema,
  });

  fastify.route({
    method: 'GET',
    url: '/auth/sign-out',
    preHandler: userGate,
    handler: signOutHandler,
    schema: signOutSchema,
  });

  fastify.route({
    method: 'GET',
    url: '/auth/whoami',
    preHandler: userGate,
    handler: whoamiHandler,
    schema: whoamiSchema,
  });
}
