import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { SpecialtiesService } from "./specialties.service";

const insertIntoDB = catchAsync(async (req, res) => {
    // console.log(req.body)
    const result = await SpecialtiesService.insertIntoDB(req);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Specialties created successfully!",
        data: result
    });
});

const getAllFromDB = catchAsync(async (req, res) => {
    // console.log(req.body)
    const result = await SpecialtiesService.getAllFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Specialties retrieve successfully!",
        data: result
    });
});


const deleteFromDB = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await SpecialtiesService.deleteFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Specialty deleted successfully',
        data: result,
    });
});


export const SpecialtiesController = {
    insertIntoDB,
    getAllFromDB,
    deleteFromDB
};