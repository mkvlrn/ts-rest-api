import { expect, test, vi } from 'vitest';
import { AuthOtherError, AuthSignInInvalidCredentialsError } from '#/api/custom-errors.js';
import { signInService } from '#/modules/auth/services/sign-in.service.js';
import * as argon2 from '#/util/argon2.js';
import { prisma } from '#/util/prisma.js';

const EMAIL = 'email@test.com';
const PASSWORD = 'password';

test('signs user in successfully', async () => {
  vi.spyOn(prisma.user, 'findUnique').mockResolvedValue({} as any);
  vi.spyOn(argon2, 'verify').mockResolvedValue(true);

  const result = await signInService(EMAIL, PASSWORD);

  expect(result).toEqual({});
});

test('throws AuthSignInInvalidCredentialsError when email not found', async () => {
  vi.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);

  const act = signInService(EMAIL, PASSWORD);

  await expect(act).rejects.toThrow('invalid credentials');
  await expect(act).rejects.toThrow(AuthSignInInvalidCredentialsError);
});

test('throws AuthSignInInvalidCredentialsError when password is wrong', async () => {
  vi.spyOn(prisma.user, 'findUnique').mockResolvedValue({} as any);
  vi.spyOn(argon2, 'verify').mockResolvedValue(false);

  const act = signInService(EMAIL, PASSWORD);

  await expect(act).rejects.toThrow('invalid credentials');
  await expect(act).rejects.toThrow(AuthSignInInvalidCredentialsError);
});

test('throws AuthOtherError when another error occurs', async () => {
  vi.spyOn(prisma.user, 'findUnique').mockRejectedValue(new Error('message'));

  const act = signInService(EMAIL, PASSWORD);

  await expect(act).rejects.toThrow('message');
  await expect(act).rejects.toThrow(AuthOtherError);
});
