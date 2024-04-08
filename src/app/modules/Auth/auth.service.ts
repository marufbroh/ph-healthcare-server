import bcrypt from 'bcrypt';
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import prisma from "../../../shared/prisma";
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { UserStatus } from '@prisma/client';
import config from '../../../config';

const loginUser = async (payload: {
    email: string,
    password: string
}) => {
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            status: UserStatus.ACTIVE
        }
    });

    const isCorrectPassword: Boolean = await bcrypt.compare(payload.password, userData.password);

    if (!isCorrectPassword) {
        throw new Error("Password Incorrect!")
    }

    const accessToken = jwtHelpers.generateToken(
        {
            email: userData.email,
            role: userData.role
        },
        config.jwt.access_token_secret as Secret,
        config.jwt.access_token_expires_in as string
    );

    const refreshToken = jwtHelpers.generateToken(
        {
            email: userData.email,
            role: userData.role
        },
        config.jwt.refresh_token_secret as Secret,
        config.jwt.refresh_token_expires_in as string
    );

    return {
        accessToken,
        refreshToken,
        needPasswordChange: userData.needPasswordChange
    };
};


const refreshToken = async (token: string) => {
    let decodedData;

    try {
        decodedData = jwtHelpers.verifyToken(token, config.jwt.refresh_token_secret as Secret);
    } catch (error) {
        throw new Error("You're not authorized!")
    };

    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: decodedData.email,
            status: UserStatus.ACTIVE
        }
    })

    const accessToken = jwtHelpers.generateToken(
        {
            email: userData.email,
            role: userData.role
        },
        config.jwt.access_token_secret as Secret,
        config.jwt.access_token_expires_in as string
    );

    return {
        accessToken,
        needPasswordChange: userData.needPasswordChange
    };
};


const changePassword = async (user: any, payload: any) => {

    const userData = await prisma.user.findFirstOrThrow({
        where: {
            email: user.email,
            status: UserStatus.ACTIVE
        }
    });


    const isCorrectPassword: Boolean = await bcrypt.compare(payload.oldPassword, userData.password);

    if (!isCorrectPassword) {
        throw new Error("Password Incorrect!")
    }

    const hashedPassword: string = await bcrypt.hash(payload.newPassword, 12);

    await prisma.user.update({
        where: {
            email: userData.email
        },
        data: {
            password: hashedPassword,
            needPasswordChange: false
        }
    });

    return {
        message: "Password Changed Successfully"
    }

};


const forgotPassword = async (payload: { email: string }) => {
    const userData = await prisma.user.findFirstOrThrow({
        where: {
            email: payload.email,
            status: UserStatus.ACTIVE
        }
    });

    const resetPasswordToken = jwtHelpers.generateToken(
        { email: userData.email, role: userData.role },
        config.jwt.reset_password_secret as Secret,
        config.jwt.reset_token_expires_in as string
    );

    

};

export const authServices = {
    loginUser,
    refreshToken,
    changePassword,
    forgotPassword,
};