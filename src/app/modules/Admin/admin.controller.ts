import { NextFunction, Request, RequestHandler, Response } from "express";
import { AdminService } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";


const getAllFromDB = catchAsync(async (req, res) => {
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

    const result = await AdminService.getAllFromDB(filters, options);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin retrieve successfully",
        meta: result.meta,
        data: result.data
    });

});

const getByIdFromDB = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await AdminService.getByIdFromDB(id)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin retrieve successfully by Id",
        data: result
    });
});



const updateIntoDB = catchAsync(async (req, res) => {
    const id = req.params.id;

    const result = await AdminService.updateIntoDB(id, req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin data updated",
        data: result
    });
});

const deleteFromDB = catchAsync(async (req, res) => {
    const id = req.params.id;

    const result = await AdminService.deleteFromDB(id)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin data deleted",
        data: result
    });
});


const softDeleteFromDB = catchAsync(async (req, res) => {
    const id = req.params.id;

    const result = await AdminService.softDeleteFromDB(id)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin data soft deleted",
        data: result
    });
});


export const AdminController = {
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB,
    softDeleteFromDB
}