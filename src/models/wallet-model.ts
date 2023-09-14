import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface WalletAttributes {
  id?: number;
  address: string;
  seed: string;
  private_key: string;
  status: string;
  withdrawal_id: string;
  created_at: Date;
}

export interface WalletModel
  extends Model<WalletAttributes>,
    WalletAttributes {}
export class Wallet extends Model<WalletModel, WalletAttributes> {}

export type WalletStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): WalletModel;
};

export function walletFactory(sequelize: Sequelize): WalletStatic {
  return <WalletStatic>sequelize.define(
    "wallet",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      seed: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      private_key: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      withdrawal_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      // indexes: [
      //     {
      //         unique: true,
      //         fields: ['address'],
      //     },
      // ],
      timestamps: false,
      tableName: "wallet",
    }
  );
}
