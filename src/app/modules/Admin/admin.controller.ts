import { Request, Response } from "express";
import { AdminService } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";

const getAllFromDB = async (req: Request, res: Response) => {
    try {
        const filters = pick(req.query, adminFilterableFields);
        const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);


        const result = await AdminService.getAllFromDB(filters, options);

        res.status(200).json({
            success: true,
            message: "Admin retrieve successfully",
            meta: result.meta,
            data: result.data
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error?.name || "Something went wrong",
            error: error
        })
    }
};

const getByIdFromDB = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const result = await AdminService.getByIdFromDB(id)
        res.status(200).json({
            success: true,
            message: "Admin retrieve successfully by Id",
            data: result
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error?.name || "Something went wrong",
            error: error
        })
    }
};



const updateIntoDB = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const result = await AdminService.updateIntoDB(id, req.body)
        res.status(200).json({
            success: true,
            message: "Admin data updated",
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error?.name || "Something went wrong",
            error: error
        })
    }
};

const deleteFromDB = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const result = await AdminService.deleteFromDB(id)
        res.status(200).json({
            success: true,
            message: "Admin data deleted",
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error?.name || "Something went wrong",
            error: error
        })
    }
};


const softDeleteFromDB = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const result = await AdminService.softDeleteFromDB(id)
        res.status(200).json({
            success: true,
            message: "Admin data soft deleted",
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error?.name || "Something went wrong",
            error: error
        })
    }
};


export const AdminController = {
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB,
    softDeleteFromDB
}