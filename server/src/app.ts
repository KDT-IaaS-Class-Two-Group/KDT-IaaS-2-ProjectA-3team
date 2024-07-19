//#region Package Module
import express, { Express } from 'express';
//#endregion 

//#region MiddleWare
import servingStatic from './middleWare/servingStatic';
//#endregion

//#region Router
import GetIndexRouter from "./routes/get/getIndexRouter"
import PostLoginRouter from "./routes/post/postLoginRouter"
import logger from './middleWare/logger';
//#endregion

const app: Express = express();

//middleware
app.use(logger)
app.use(express.json());
servingStatic(app);

//route
app.use('/login', PostLoginRouter);
app.use('/', GetIndexRouter);


export default app;
