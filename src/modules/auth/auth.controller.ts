import { FastifyReply, FastifyRequest } from 'fastify';
import { UnauthorizedError } from '#/api/custom-errors.js';
import {
  createSignInReponse,
  createSignUpReponse,
  createWhoamiResponse,
  SignInRequest,
  SignUpRequest,
} from '#/modules/auth/auth.schema.js';
import { signInService } from '#/modules/auth/services/sign-in.service.js';
import { signUpService } from '#/modules/auth/services/sign-up.service.js';
import { prisma } from '#/util/prisma.js';

export async function signUpHandler(request: FastifyRequest<SignUpRequest>, reply: FastifyReply) {
  const { email, password } = request.body;

  const user = await signUpService(email, password);
  const response = createSignUpReponse(user);
  request.session.user = { id: user.id, email: user.email };

  reply.status(201).send(response);
}

export async function signInHandler(request: FastifyRequest<SignInRequest>, reply: FastifyReply) {
  const { email, password } = request.body;

  const user = await signInService(email, password);
  const response = createSignInReponse(user);
  request.session.user = { id: user.id, email: user.email };

  reply.send(response);
}

export async function signOutHandler(request: FastifyRequest, reply: FastifyReply) {
  await request.session.destroy();

  reply.status(204).clearCookie('session', { path: '/' }).send();
}

export async function whoamiHandler(request: FastifyRequest, reply: FastifyReply) {
  const id = request.session.user?.id;

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new UnauthorizedError();

  const response = createWhoamiResponse(user);

  reply.send(response);
}

export async function userGate(request: FastifyRequest, _reply: FastifyReply) {
  if (!request.session.user) throw new UnauthorizedError();
}
