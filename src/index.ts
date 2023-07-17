import { getServer } from '#/api/server.js';

const server = getServer();

await server.ready();
await server.listen({ port: process.env.PORT ?? 4000, host: '0.0.0.0' });

for await (const signal of ['SIGINT', 'SIGTERM', 'SIGUSR2']) {
  process.on(signal, async () => {
    await server.close();
    process.kill(process.pid, signal);
    process.exit(0);
  });
}
