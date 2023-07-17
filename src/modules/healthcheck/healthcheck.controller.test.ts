import { expect, test, vi } from 'vitest';
import { getHealthcheckHandler } from '#/modules/healthcheck/healthcheck.controller.js';
import * as service from '#/modules/healthcheck/healthcheck.service.js';

test('getHealthcheckHandler', async () => {
  vi.spyOn(service, 'healthcheckSvc').mockResolvedValueOnce({ healthy: true });
  const request = {} as any;
  const reply = { send: vi.fn() } as any;

  await getHealthcheckHandler(request, reply);

  expect(reply.send).toHaveBeenCalledWith({ healthy: true });
});
