import { AuthOtherError, AuthSignInInvalidCredentialsError } from '#/api/custom-errors.js';
import { verify } from '#/util/argon2.js';
import { prisma } from '#/util/prisma.js';

export async function signInService(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new AuthSignInInvalidCredentialsError();

    const passwordMatches = await verify(user.password, password);
    if (!passwordMatches) throw new AuthSignInInvalidCredentialsError();

    return user;
  } catch (error) {
    if (error instanceof AuthSignInInvalidCredentialsError) throw error;

    throw new AuthOtherError((error as Error).message);
  }
}
