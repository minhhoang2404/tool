import Fastify, { FastifyInstance } from 'fastify';
import errorHandler from './plugins/error-handler';
import { JoiSchema } from './interfaces/validator';
import Routes from './routes/v1';
import cors from 'fastify-cors';

const server: FastifyInstance = Fastify({ bodyLimit: 30 * 1024 * 1024 });

server.register(Routes, { prefix: '/v1' });

server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true
  });

server.setErrorHandler(errorHandler);

server.setValidatorCompiler<JoiSchema>(({ schema }) => {
    return data => schema.validate(data);
});

export default server;
