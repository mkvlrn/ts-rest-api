import cookie from '@fastify/cookie';
import session from '@fastify/session';
import fastify, { FastifyInstance, FastifyLoggerOptions } from 'fastify';
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import { PinoLoggerOptions } from 'fastify/types/logger.js';
import { errorHandler, notFoundHandler } from '#/api/error-handler.js';
import { router } from '#/api/router.js';
import { sessionOptions } from '#/util/session-options.js';

export function getServer(): FastifyInstance {
  const { NODE_ENV } = process.env;
  const isProduction = NODE_ENV === 'production';
  const logger: (FastifyLoggerOptions & PinoLoggerOptions) | boolean = isProduction
    ? true
    : { transport: { target: 'pino-pretty' } };

  const server = fastify({ logger, ignoreTrailingSlash: true });

  server
    .setValidatorCompiler(validatorCompiler)
    .setSerializerCompiler(serializerCompiler)
    .withTypeProvider<ZodTypeProvider>()
    .setErrorHandler(errorHandler)
    .setNotFoundHandler(notFoundHandler)
    .register(cookie)
    .register(session, sessionOptions)
    .register(router);

  return server;
}
