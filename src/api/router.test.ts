import { expect, test, vi } from 'vitest';
import { router } from '#/api/router.js';

test('router is called', async () => {
  const fastifyMock = { route: vi.fn() } as any;

  await router(fastifyMock);

  expect(fastifyMock.route).toHaveBeenCalled();
});
