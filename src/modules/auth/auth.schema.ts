import { User } from '@prisma/client';
import { FastifySchema } from 'fastify';
import { z } from 'zod';

// sign-up
const signUpRequest = z.object({
  email: z.string({ required_error: 'email is a required field' }).email('email is not valid'),
  password: z
    .string({ required_error: 'password is a required field' })
    .min(8, 'password must be at least 8 characters long')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\dA-Za-z]).{8,}$/,
      'password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
    ),
});
const signUpResponse = z.object({
  loggedInAs: z.string(),
});
export const signUpSchema: FastifySchema = {
  body: signUpRequest,
  response: { 201: signUpResponse },
};
export type SignUpRequest = { Body: z.infer<typeof signUpRequest> };
export function createSignUpReponse(user: User): z.infer<typeof signUpResponse> {
  return { loggedInAs: user.email };
}

// sign-in
export const signInSchema: FastifySchema = {
  body: signUpRequest,
  response: { 200: signUpResponse },
};
export type SignInRequest = SignUpRequest;
export const createSignInReponse = createSignUpReponse;

// sign-out
export const signOutSchema: FastifySchema = {
  response: { 204: {} },
};

// whoami
const whoamiResponse = z.object({
  id: z.string(),
  email: z.string().email(),
});
export const whoamiSchema: FastifySchema = {
  response: { 200: whoamiResponse },
};
export function createWhoamiResponse(user: User): z.infer<typeof whoamiResponse> {
  return { id: user.id, email: user.email };
}
