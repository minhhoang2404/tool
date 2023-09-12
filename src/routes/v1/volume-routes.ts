import { FastifyInstance, FastifyPluginOptions } from "fastify";
import Joi from "joi";
import { getBasedSchema } from "./schema";
import { VolumeController } from "../../controllers";

export default function routes(
  fastify: FastifyInstance,
  opts: FastifyPluginOptions,
  done: (err?: Error) => void
): void {
  const basedSchema = (includeSecurity = true) =>
    getBasedSchema("transaction", includeSecurity);

  fastify.get(
    "/volume",
    {
      schema: {
        ...basedSchema(true),
        querystring: Joi.object({
          name: Joi.string().required(),
          day: Joi.number().required(),
        }).required(),
        summary: "Get volume",
      },
    },
    VolumeController.getVolume
  );

  done();
}
