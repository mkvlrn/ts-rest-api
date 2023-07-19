import { User } from '@prisma/client';

declare module 'fastify' {
  interface Session {
    user: Pick<User, 'id' | 'email'> | null;
  }
}
