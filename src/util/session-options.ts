import session, { FastifySessionOptions } from '@fastify/session';
import connectPgSimple from 'connect-pg-simple';

const { NODE_ENV, SESSION_DURATION_IN_MINUTES, SESSION_NAME, SESSION_SECRET, DATABASE_URL } =
  process.env;
const isProduction = NODE_ENV === 'production';
const PgSessionStore = connectPgSimple(session as any);

export const sessionOptions: FastifySessionOptions = {
  store: new PgSessionStore({
    tableName: 'sessions',
    conString: DATABASE_URL,
  }) as any,
  secret: SESSION_SECRET,
  cookieName: SESSION_NAME,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: isProduction,
    maxAge: +SESSION_DURATION_IN_MINUTES * 60 * 1000,
  },
};
