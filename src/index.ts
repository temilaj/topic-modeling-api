/* eslint-disable import/first */
import dotenv from 'dotenv';

dotenv.config({});

import app from './app';
import config from './config/environments';
import logger from './config/logger';
import { connectToDB } from './config/Database';

const { port, env, database } = config;

connectToDB(database.URI);

app.listen(port, () => logger.info(` (${env}) server started on port ${port}`));

/**
 * Exports express
 * @public
 */
module.exports = app;
