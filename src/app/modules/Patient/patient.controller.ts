import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import { patientFilterableFields } from "./patient.constants";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { PatientService } from "./patient.services";

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, patientFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  
    const result = await PatientService.getAllFromDB(filters, options);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Patient retrieval successfully',
      meta: result.meta,
      data: result.data,
    });
  });
  
  const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  
    const { id } = req.params;
    const result = await PatientService.getByIdFromDB(id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Patient retrieval successfully',
      data: result,
    });
  });

  const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await PatientService.deleteFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Patient deleted successfully',
      data: result,
    });
  });


  export const PatientController = {
    getAllFromDB,
    getByIdFromDB,
    deleteFromDB
  };