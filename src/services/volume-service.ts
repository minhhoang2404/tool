import moment from "moment";
import { VolumeModel } from "../models";
import { Op } from "sequelize";

export async function getVolume(name: string, day: number) {
  const listVolume = await VolumeModel.findAll({
    where: {
      name,
      updated_at: {
        [Op.between]: [
          moment().startOf("minute").subtract(day, "d").toDate(),
          moment().startOf("minute").toDate(),
        ],
      },
    },
    order: [["updated_at", "ASC"]],
  });
  const res = [];
  await listVolume.map((item) => {
    res.push([
      moment(item.getDataValue("updated_at")).valueOf(),
      item.getDataValue("volume"),
    ]);
  });

  return res;
}