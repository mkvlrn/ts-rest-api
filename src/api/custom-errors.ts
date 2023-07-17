import { createError } from '@fastify/error';

export const InternalServerError = createError('INTERNAL_SERVER_ERROR', '%s', 500);
export const ResourceNotFound = createError('RESOURCE_NOT_FOUND', 'path %s not found', 404);
