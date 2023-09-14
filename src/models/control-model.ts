import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface ControlAttributes {
  id?: number;
  chat_id: string;
  status: boolean;
  updated_at: Date;
}

export interface ControlModel
  extends Model<ControlAttributes>,
    ControlAttributes {}
export class Control extends Model<ControlModel, ControlAttributes> {}

export type ControlStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ControlModel;
};

export function controlFactory(sequelize: Sequelize): ControlStatic {
  return <ControlStatic>sequelize.define(
    "control",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      chat_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      // indexes: [
      //     {
      //         unique: true,
      //         fields: ['chat_id'],
      //     },
      // ],
      timestamps: false,
      tableName: "control",
    }
  );
}
