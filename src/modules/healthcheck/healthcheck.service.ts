import { HealthCheckResponse } from '#/modules/healthcheck/healthcheck.schema.js';
import { prisma } from '#/util/prisma.js';

export async function healthcheckSvc(): Promise<HealthCheckResponse> {
  try {
    const result = (await prisma.$queryRaw`SELECT true as healthy`) as [{ healthy: boolean }];

    return { healthy: result[0].healthy };
  } catch (error) {
    const message = (error as Error).message.includes('prisma')
      ? 'database error'
      : (error as Error).message;

    return { healthy: false, message };
  }
}
