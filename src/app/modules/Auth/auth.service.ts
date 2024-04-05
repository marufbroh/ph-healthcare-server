import bcrypt from 'bcrypt';
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import prisma from "../../../shared/prisma";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserStatus } from '@prisma/client';

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
        "abcdefg",
        "5m"
    );

    const refreshToken = jwtHelpers.generateToken(
        {
            email: userData.email,
            role: userData.role
        },
        "abcdefgh",
        "30d"
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
        decodedData = jwtHelpers.verifyToken(token, "abcdefgh");
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
        "abcdefg",
        "5m"
    );

    return {
        accessToken,
        needPasswordChange: userData.needPasswordChange
    };
}

export const authServices = {
    loginUser,
    refreshToken,
};