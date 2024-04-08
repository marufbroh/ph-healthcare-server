import { UserRole } from '@prisma/client';
import express from 'express';
import { fileUploader } from '../../../helpers/fileUploader';
import auth from '../../middlewares/auth';
import { userController } from './user.controller';

const router = express.Router();



router.post("/",
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    fileUploader.upload.single('file'),
    userController.createAdmin)

export const UserRoutes = router;