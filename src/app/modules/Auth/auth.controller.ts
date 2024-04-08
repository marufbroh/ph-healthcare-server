import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { authServices } from "./auth.service";
import { Request } from "express";

const loginUser = catchAsync(async (req, res) => {
    const result = await authServices.loginUser(req.body);

    const { refreshToken } = result;

    res.cookie('refreshToken', refreshToken, {
        secure: false,
        httpOnly: true
    })

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Logged In Successful",
        data: {
            accessToken: result.accessToken,
            needPasswordChange: result.needPasswordChange
        }
    })
});

const refreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;

    const result = await authServices.refreshToken(refreshToken);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Access Token Generated Successful",
        data: {
            accessToken: result.accessToken,
            needPasswordChange: result.needPasswordChange
        }
    })
});


const changePassword = catchAsync(async (req: Request & { user?: any }, res) => {
    const user = req.user;
    const changePasswordData = req.body;
    const result = await authServices.changePassword(user, changePasswordData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Password Changed Successfully",
        data: result
    })
});


const forgotPassword = catchAsync(async (req: Request & { user?: any }, res) => {

    const result = await authServices.forgotPassword(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Password Forgot Successfully",
        data: result
    })
});

export const authController = {
    loginUser,
    refreshToken,
    changePassword,
    forgotPassword,
};