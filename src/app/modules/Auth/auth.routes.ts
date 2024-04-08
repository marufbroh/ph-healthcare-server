import express from 'express';
import { authController } from './auth.controller';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.post("/login", authController.loginUser);

router.post("/refresh-token", authController.refreshToken);

router.post("/change-password",
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
    authController.changePassword);

router.post("/forgot-password",
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
    authController.forgotPassword);

export const AuthRoutes = router;