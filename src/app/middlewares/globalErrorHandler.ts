import { NextFunction, Request, Response } from "express"
import httpStatus from "http-status"


const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message || "Something went wrong!",
        error: error
    })
};

export default globalErrorHandler;