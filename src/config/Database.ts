import mongoose, { Model, Connection } from 'mongoose';

import { IUserDocument, User } from '../models/User';
import { IArticleDocument, Article } from '../models/Article';

import config from './environments';
import logger from './logger';

export interface IDatabase {
  User: Model<IUserDocument>;
  Article: Model<IArticleDocument>;
}

export const models: IDatabase = {
  User,
  Article,
};

export const connectToDB = (databaseURI: string): Connection => {
  const connect = async () => {
    const databaseOptions = {
      minPoolSize: 10,
    };

    mongoose.Promise = global.Promise;
    if (config.isDevelopment) {
      mongoose.set('debug', true);
    }
    await mongoose.connect(databaseURI, databaseOptions).catch((error) => {
      logger.error(`error creating connection to ${databaseURI}`, error);
      return process.exit(1);
    });
  };
  connect();

  mongoose.connection.on('disconnected', () => {
    logger.info(`disconnected from ${databaseURI}`);
    connect();
  });
  mongoose.connection.on('connected', () => logger.info(`Monoose connected to ${databaseURI} successfully`));
  mongoose.connection.on('error', logger.error);

  return mongoose.connection;
};
