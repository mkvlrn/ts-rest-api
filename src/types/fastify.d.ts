import { FastifySessionObject } from '@fastify/session';
import { User } from '@prisma/client';

declare module 'fastify' {
  interface FastifyRequest {
    session: FastifySessionObject;
  }

  interface FastifyReply {
    clearCookie: (name: string, options?: any) => FastifyReply;
  }

  interface Session {
    user: Pick<User, 'id' | 'email'> | null;
  }
}
