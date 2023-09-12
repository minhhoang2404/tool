import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import VolumeRoutes from './volume-routes';

export default function routes(fastify: FastifyInstance, opts: FastifyPluginOptions, done: (err?: Error) => void): void {
    fastify.get('/health-check', opts, async (request, reply): Promise<any> => {
        reply.send({ ok: true });
    });

    fastify.register(VolumeRoutes);

    done();
}