import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';
import { UserRole } from '@prisma/client';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';

const router = express.Router();

const auth = (...roles: string[]) => {

    return async (req: Request, res: Response, next: NextFunction) => {

        try {
            const token = req.headers.authorization;

            if (!token) {
                throw new Error("You're not authorized!")
            }
            const verifiedUser = jwtHelpers.verifyToken(token, config.jwt.access_token_secret as Secret);

            if(roles.length && !roles.includes(verifiedUser.role)){
                throw new Error("You're not authorized!")
            }
            
            next();
        } catch (error) {
            next(error);
        }
    }

}

router.post("/", auth(UserRole.SUPER_ADMIN, UserRole.ADMIN), userController.createAdmin)

export const UserRoutes = router;