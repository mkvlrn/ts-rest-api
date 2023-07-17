import { expect, test, vi } from 'vitest';
import { ZodError, ZodIssueCode } from 'zod';
import { InternalServerError } from '#/api/custom-errors.js';
import { errorHandler } from '#/api/error-handler.js';

test('handles zod error', () => {
  const error = new ZodError([
    {
      code: ZodIssueCode.invalid_string,
      path: ['email'],
      message: 'invalid email',
      validation: 'email',
    },
  ]);
  const request = {} as any;
  const reply = { status: vi.fn().mockReturnThis(), send: vi.fn() } as any;

  errorHandler(error, request, reply);

  expect(reply.status).toHaveBeenCalledWith(400);
  expect(reply.send).toHaveBeenCalledWith({
    statusCode: 400,
    error: 'Bad Request',
    code: 'VALIDATION_ERROR',
    message: ['invalid email'],
  });
});

test('handles fastify error', () => {
  const error = new InternalServerError('test error');
  const request = {} as any;
  const reply = { status: vi.fn().mockReturnThis(), send: vi.fn() } as any;

  errorHandler(error, request, reply);

  expect(reply.status).toHaveBeenCalledWith(500);
  expect(reply.send).toHaveBeenCalledWith({
    statusCode: 500,
    error: 'Internal Server Error',
    code: 'INTERNAL_SERVER_ERROR',
    message: 'test error',
  });
});

test('handles unknown error', () => {
  const error = new Error('unknown error');
  const request = {} as any;
  const reply = { status: vi.fn().mockReturnThis(), send: vi.fn() } as any;

  errorHandler(error, request, reply);

  expect(reply.status).toHaveBeenCalledWith(500);
  expect(reply.send).toHaveBeenCalledWith({
    statusCode: 500,
    error: 'Internal Server Error',
    code: 'INTERNAL_SERVER_ERROR',
    message: 'unknown error',
  });
});
