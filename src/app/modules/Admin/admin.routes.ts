import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AdminController } from './admin.controller';
import { adminValidationSchemas } from './admin.validations';

const router = express.Router();


router.get("/", AdminController.getAllFromDB)
router.get("/:id", AdminController.getByIdFromDB)
router.patch("/:id", validateRequest(adminValidationSchemas.updateAdmin), AdminController.updateIntoDB)
router.delete("/:id", AdminController.deleteFromDB)
router.delete("/soft/:id", AdminController.softDeleteFromDB)


export const AdminRoutes = router;