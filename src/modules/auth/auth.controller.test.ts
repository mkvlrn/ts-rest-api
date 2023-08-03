import { expect, test, vi } from 'vitest';
import { UnauthorizedError } from '#/api/custom-errors.js';
import {
  signInHandler,
  signOutHandler,
  signUpHandler,
  userGate,
  whoamiHandler,
} from '#/modules/auth/auth.controller.js';
import * as signInService from '#/modules/auth/services/sign-in.service.js';
import * as signUpService from '#/modules/auth/services/sign-up.service.js';
import { prisma } from '#/util/prisma.js';

const REQUEST = {
  body: { email: 'email@test.com', password: 'password' },
  session: { user: {}, destroy: vi.fn() },
} as any;

const REPLY = {
  status: vi.fn().mockReturnThis(),
  clearCookie: vi.fn().mockReturnThis(),
  send: vi.fn(),
} as any;

const USER = { id: 'id', email: 'email@test.com' } as any;

test('signUpHandler', async () => {
  vi.spyOn(signUpService, 'signUpService').mockResolvedValue(USER);

  await signUpHandler(REQUEST, REPLY);

  expect(REPLY.status).toHaveBeenCalledWith(201);
  expect(REPLY.send).toHaveBeenCalled();
  expect(REQUEST.session.user).toEqual(USER);
});

test('signInHandler', async () => {
  vi.spyOn(signInService, 'signInService').mockResolvedValue(USER);

  await signInHandler(REQUEST, REPLY);

  expect(REPLY.send).toHaveBeenCalled();
  expect(REQUEST.session.user).toEqual(USER);
});

test('signOutHandler', async () => {
  vi.stubEnv('SESSION_NAME', 'session');

  await signOutHandler(REQUEST, REPLY);

  expect(REQUEST.session.destroy).toHaveBeenCalled();
  expect(REPLY.status).toHaveBeenCalledWith(204);
  expect(REPLY.clearCookie).toHaveBeenCalledWith('session', { path: '/' });
  expect(REPLY.send).toHaveBeenCalled();
});

test('whoamiHandler', async () => {
  vi.spyOn(prisma.user, 'findUnique').mockResolvedValue(USER);
  const MODIFIED_REQUEST = { ...REQUEST, user: { id: USER.id } } as any;

  await whoamiHandler(MODIFIED_REQUEST, REPLY);

  expect(REPLY.send).toHaveBeenCalledWith(USER);
});

test('whoamiHandler throws UnauthorizedError', async () => {
  vi.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);
  const MODIFIED_REQUEST = { ...REQUEST, user: { id: USER.id } } as any;

  const act = () => whoamiHandler(MODIFIED_REQUEST, REPLY);

  await expect(act).rejects.toThrow('unauthorized');
  await expect(act).rejects.toThrow(UnauthorizedError);
});

test('userGate', async () => {
  const MODIFIED_REQUEST = { ...REQUEST, user: { id: USER.id } } as any;

  const act = () => userGate(MODIFIED_REQUEST, REPLY);

  await expect(act()).resolves.toBeUndefined();
});

test('userGate throws UnauthorizedError', async () => {
  const MODIFIED_REQUEST = { ...REQUEST, session: { user: null } } as any;

  const act = () => userGate(MODIFIED_REQUEST, REPLY);

  await expect(act).rejects.toThrow('unauthorized');
  await expect(act).rejects.toThrow(UnauthorizedError);
});
