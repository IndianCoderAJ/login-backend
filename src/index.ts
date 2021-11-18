/**
 *
 * @description Server and REST API config
 */
 import * as bodyParser from 'body-parser';
 import cors from 'cors'; 
 import dotenv from 'dotenv';
 dotenv.config()
 import express, { NextFunction, Request, Response } from 'express';
 import http from 'http';
 import helmet from 'helmet';
 import swaggerUi from 'swagger-ui-express';
 import { internalServerError } from './helpers/response';
 import logger from './logger';
 import dbConnection from './database/index'


 import userRoute from './routes/users'

 import * as swaggerDocument from './swagger.json';
 const app = express();
 
 let server = new http.Server(app);
 
 /**
  * DB connection.
  */

 dbConnection();


 /**
  * Handle connection to socket.io.
  */
 app.use(cors());
 app.use(helmet());
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use((req, res, next) => {
     try {
         const xForwardedFor = ((req.headers['x-forwarded-for'] || '') as string).replace(/:\d+$/, '');
         const ip = xForwardedFor || req.connection.remoteAddress;
         logger.info(
             `IMP - API called path: ${req.path} method: ${req.method}, query: ${JSON.stringify(
                 req.query,
             )}, remote address (main/proxy ip):${ip}, reference: ${req.headers.referer} and user-agent: ${
                 req.headers['user-agent']
             }`,
         );
     } catch (error) {
         logger.error(`error while printing caller info path: ${req.path}`);
     }
 
     next();
 });
 const health = async (req: Request, res: Response) => {
     res.json({ message: 'working', env: process.env.NODE_ENV, headers: req.headers });
 };
 
 app.get('/', health);
 app.get('/health', health);
 app.use('/user', userRoute);
 
 app.use((error: any, req: Request, res: Response, next: NextFunction) => {
     res.json(500).json(
         internalServerError({
             message: error.message,
         }),
     );
 });
 
 app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
 export default server;
 