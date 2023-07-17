import { FastifyReply, FastifyRequest } from 'fastify';
import { healthcheckSvc } from '#/modules/healthcheck/healthcheck.service.js';

export async function getHealthcheckHandler(_request: FastifyRequest, reply: FastifyReply) {
  const response = await healthcheckSvc();

  reply.send(response);
}
