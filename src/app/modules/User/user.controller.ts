import { Request, Response } from "express";
import { userService } from "./user.service";
import catchAsync from "../../../shared/catchAsync";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
    try {
        // console.log(req.body);
        const result = await userService.createAdmin(req);

        res.status(200).json({
            success: true,
            message: "Admin created successfully",
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error?.message || "Something went wrong",
            error: error
        })
    }
});

export const userController = {
    createAdmin
}