import { AuthOtherError, AuthSignUpEmailAlreadyInUseError } from '#/api/custom-errors.js';
import { hash } from '#/util/argon2.js';
import { prisma } from '#/util/prisma.js';

export async function signUpService(email: string, password: string) {
  try {
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) throw new AuthSignUpEmailAlreadyInUseError(email);

    const passwordHash = await hash(password);
    const user = await prisma.user.create({ data: { email, password: passwordHash } });

    return user;
  } catch (error) {
    if (error instanceof AuthSignUpEmailAlreadyInUseError) throw error;

    throw new AuthOtherError((error as Error).message);
  }
}
