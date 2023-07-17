import fastify, { FastifyInstance, FastifyLoggerOptions } from 'fastify';
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import { PinoLoggerOptions } from 'fastify/types/logger.js';
import { errorHandler } from '#/api/error-handler.js';
import { router } from '#/api/router.js';

export function getServer(): FastifyInstance {
  const isProduction = process.env.NODE_ENV === 'production';
  const logger: (FastifyLoggerOptions & PinoLoggerOptions) | boolean = isProduction
    ? true
    : { transport: { target: 'pino-pretty' } };

  const server = fastify({ logger, ignoreTrailingSlash: true });

  server
    .setValidatorCompiler(validatorCompiler)
    .setSerializerCompiler(serializerCompiler)
    .withTypeProvider<ZodTypeProvider>()
    .setErrorHandler(errorHandler)
    .register(router);

  return server;
}
