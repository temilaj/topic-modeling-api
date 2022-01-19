import express, { Application } from 'express';
import morgan from 'morgan';
import http from 'http';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';

import routes from './routes/v1';
import envVariables from './config/environments';
import errorHandler from './utils/errorHandler';

const app: Application = express();

app.use(morgan('dev'));
const server = http.createServer(app);

app.use(compression());
app.use(helmet());
app.use(
  cors({
    origin: [envVariables.appURL],
    credentials: true,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// mount api v1 routes
app.use('/v1', routes);

app.use(errorHandler);

export default server;
