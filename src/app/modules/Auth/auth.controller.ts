import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { authServices } from "./auth.service";

const loginUser = catchAsync(async (req, res, next) => {
    const result = authServices.loginUser(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Logged In Successful",
        data: result
    })
});

export const authController = {
    loginUser
};