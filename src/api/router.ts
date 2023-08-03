import { FastifyInstance } from 'fastify';
import { authRouter } from '#/modules/auth/auth.router.js';
import { healthcheckRouter } from '#/modules/healthcheck/healthcheck.router.js';

export async function router(fastify: FastifyInstance) {
  healthcheckRouter(fastify);
  authRouter(fastify);
}
