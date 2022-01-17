/* eslint-disable import/first */
import dotenv from 'dotenv';

dotenv.config({});

import app from './app';

app.listen(3000, () => console.info('dev API server started on port 3000'));

/**
 * Exports express
 * @public
 */
module.exports = app;
