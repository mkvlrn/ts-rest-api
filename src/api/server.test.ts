import { expect, test, vi } from 'vitest';
import { getServer } from '#/api/server.js';

test('creates dev server', () => {
  vi.stubEnv('NODE_ENV', 'development');
  const server = getServer();

  expect(server).toBeDefined();
});

test('creates prod server', () => {
  vi.stubEnv('NODE_ENV', 'production');
  const server = getServer();

  expect(server).toBeDefined();
});
