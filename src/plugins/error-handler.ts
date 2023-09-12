import { FastifyInstance, FastifyError, FastifyRequest, FastifyReply } from 'fastify';
import httpStatus from 'http-status';
import sendLog from '../utils/slack-bot';
import { NODE_ENV } from '../config';
import { pick } from 'lodash';

export default function handleError(this: FastifyInstance, error: FastifyError, request: FastifyRequest, reply: FastifyReply): void {
    if (NODE_ENV == 'development') console.error('[Error]', error);

    sendLog({
        msg: 'Got error',
        err: error,
        data: { request: pick(request, ['method', 'url', 'params', 'query', 'body', 'headers']) }
    });

    reply.status(error.statusCode || (error.code && parseInt(error.code)) || httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
}
