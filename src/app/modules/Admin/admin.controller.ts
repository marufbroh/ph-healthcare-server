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
        const result = await AdminService.getByIdFromDB()
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
}


export const AdminController = {
    getAllFromDB,
    getByIdFromDB,
}