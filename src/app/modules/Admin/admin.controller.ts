import { NextFunction, Request, Response } from "express";
import { AdminService } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";


const getAllFromDB = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filters = pick(req.query, adminFilterableFields);
        const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);


        const result = await AdminService.getAllFromDB(filters, options);

        // res.status(200).json({
        //     success: true,
        //     message: "Admin retrieve successfully",
        //     meta: result.meta,
        //     data: result.data
        // })

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Admin retrieve successfully",
            meta: result.meta,
            data: result.data
        });

    } catch (error) {
        next(error)
    }
};

const getByIdFromDB = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const result = await AdminService.getByIdFromDB(id)

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Admin retrieve successfully by Id",
            data: result
        });

    } catch (error) {
        next(error)
    }
};



const updateIntoDB = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const result = await AdminService.updateIntoDB(id, req.body)

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Admin data updated",
            data: result
        });

    } catch (error) {
        next(error)
    }
};

const deleteFromDB = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const result = await AdminService.deleteFromDB(id)

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Admin data deleted",
            data: result
        });

    } catch (error) {
        next(error)
    }
};


const softDeleteFromDB = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const result = await AdminService.softDeleteFromDB(id)

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Admin data soft deleted",
            data: result
        });

    } catch (error) {
        next(error)
    }
};


export const AdminController = {
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB,
    softDeleteFromDB
}