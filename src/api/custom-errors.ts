import { createError } from '@fastify/error';

export const InternalServerError = createError('INTERNAL_SERVER_ERROR', '%s', 500);
export const ResourceNotFound = createError('RESOURCE_NOT_FOUND', 'path %s not found', 404);
export const AuthOtherError = createError('AUTH/OTHER', '%s', 500);
export const AuthSignUpEmailAlreadyInUseError = createError(
  'AUTH/SIGNIN/EMAIL_ALREADY_IN_USE',
  'email %s already in use',
  409,
);
export const AuthSignInInvalidCredentialsError = createError(
  'AUTH/SIGNIN/INVALID_CREDENTIALS',
  'invalid credentials',
  401,
);
export const UnauthorizedError = createError('UNAUTHORIZED', 'unauthorized', 401);
