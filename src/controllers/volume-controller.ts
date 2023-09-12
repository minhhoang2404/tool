import { FastifyReply } from "fastify";
import HttpStatus from "http-status";
import { RequestWithUser } from "../interfaces/request";
import { VolumeService } from "../services";

export async function getVolume(
  request: RequestWithUser,
  reply: FastifyReply
): Promise<void> {
  const { name, day } = request.query;
  reply.code(HttpStatus.OK).send(await VolumeService.getVolume(name, day));
}