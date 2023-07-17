import { expect, test, vi } from 'vitest';
import { healthcheckSvc } from '#/modules/healthcheck/healthcheck.service.js';
import { prisma } from '#/util/prisma.js';

test('healthy', async () => {
  vi.spyOn(prisma, '$queryRaw').mockResolvedValueOnce([{ healthy: true }]);

  const response = await healthcheckSvc();

  expect(response).toEqual({ healthy: true });
});

test('unhealthy', async () => {
  vi.spyOn(prisma, '$queryRaw').mockRejectedValue(new Error('test error'));

  const response = await healthcheckSvc();

  expect(response).toEqual({ healthy: false, message: 'test error' });
});

test('unhealthy because database error', async () => {
  vi.spyOn(prisma, '$queryRaw').mockRejectedValue(new Error('prisma error'));

  const response = await healthcheckSvc();

  expect(response).toEqual({ healthy: false, message: 'database error' });
});
