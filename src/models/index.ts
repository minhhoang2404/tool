import { BuildOptions, Model, Sequelize } from 'sequelize';
import { DB_URI, DB_NAME } from '../config';
import { AppLogger as logger } from '../utils/logger';

import sendLog from '../utils/slack-bot';

import { volumeFactory } from './volume-model';

export const sequelize = new Sequelize(DB_URI + "/" + DB_NAME, {
    logging: false,
});

export type StaticModel = typeof Model & {
    new (values?: object, options?: BuildOptions): Model;
};

export const VolumeModel = volumeFactory(sequelize);

export async function initDatabase(): Promise<void> {
    try {
        await sequelize.authenticate();
        await sequelize.sync({
            // force: !!process.env.RESET_DB, // Drop DB then init tables again. Turn it on when needed
        });

        logger.log('Connection has been established successfully.');
    } catch (error: any) {
        logger.error('[Error] Unable to connect to the database:', error.stack);
        sendLog({ msg: "[Error] Unable to connect to the database", err: error});
        throw error;
    }
}
