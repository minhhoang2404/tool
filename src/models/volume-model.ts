import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface VolumeAttributes {
    id?: number;
    name: string;
    volume: number;
    updated_at: Date;
}

export interface VolumeModel extends Model<VolumeAttributes>, VolumeAttributes {}
export class Volume extends Model<VolumeModel, VolumeAttributes> {}

export type VolumeStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): VolumeModel;
};

export function volumeFactory(sequelize: Sequelize): VolumeStatic {
    return <VolumeStatic>sequelize.define(
        'volume',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            volume: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
            }
        },
        {
            // indexes: [
            //     {
            //         unique: true,
            //         fields: ['alias'],
            //     },
            //     {
            //         unique: true,
            //         fields: ['name'],
            //     },
            // ],
            timestamps: false,
            tableName: 'volume',
        }
    );
}
