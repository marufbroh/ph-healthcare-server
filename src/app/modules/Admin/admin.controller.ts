import { Request, Response } from "express";
import { AdminService } from "./admin.service";
import pick from "../../../shared/pick";

const getAllFromDB = async (req: Request, res: Response) => {
    try {
        const filters = pick(req.query, ['name', 'email', 'searchTerm', 'contactNumber']);

        const result = await AdminService.getAllFromDB(filters);

        res.status(200).json({
            success: true,
            message: "Admin retrieve successfully",
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong",
            error: error
        })
    }
};


export const AdminController = {
    getAllFromDB,
}