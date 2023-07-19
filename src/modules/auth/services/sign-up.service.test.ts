import { expect, test, vi } from 'vitest';
import { AuthOtherError, AuthSignUpEmailAlreadyInUseError } from '#/api/custom-errors.js';
import { signUpService } from '#/modules/auth/services/sign-up.service.js';
import * as argon2 from '#/util/argon2.js';
import { prisma } from '#/util/prisma.js';

const EMAIL = 'email@test.com';
const PASSWORD = 'password';

test('creates user successfully', async () => {
  vi.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);
  vi.spyOn(argon2, 'hash').mockResolvedValue('passwordHash');
  vi.spyOn(prisma.user, 'create').mockResolvedValue({} as any);

  const result = await signUpService(EMAIL, PASSWORD);

  expect(result).toEqual({});
});

test('throws AuthSignInEmailAlreadyInUseError when email is already in use', async () => {
  vi.spyOn(prisma.user, 'findUnique').mockResolvedValue({} as any);
  const act = signUpService(EMAIL, PASSWORD);

  await expect(act).rejects.toThrow(`email ${EMAIL} already in use`);
  await expect(act).rejects.toThrow(AuthSignUpEmailAlreadyInUseError);
});

test('throws AuthOtherError when another error occurs', async () => {
  vi.spyOn(prisma.user, 'findUnique').mockRejectedValue(new Error('message'));

  const act = signUpService(EMAIL, PASSWORD);

  await expect(act).rejects.toThrow('message');
  await expect(act).rejects.toThrow(AuthOtherError);
});
