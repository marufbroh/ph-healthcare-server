import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import router from './app/routes';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
    res.send({
        message: "PH Health Care Server"
    })
});

app.use("/api/v1", router);

app.use(globalErrorHandler);

export default app;