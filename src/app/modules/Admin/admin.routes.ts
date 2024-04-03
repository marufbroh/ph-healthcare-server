import express, { NextFunction, Request, Response } from 'express';
import { AdminController } from './admin.controller';
import { AnyZodObject, ZodObject, z } from 'zod';

const router = express.Router();

const updateAdmin = z.object({
    body: z.object({
        name: z.string().optional(),
        contactNumber: z.string().optional()
    })
})

const validateRequest = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body
            })
            return next();
        } catch (error) {
            next(error)
        }
    }
}

router.get("/", AdminController.getAllFromDB)
router.get("/:id", AdminController.getByIdFromDB)
router.patch("/:id", validateRequest(updateAdmin), AdminController.updateIntoDB)
router.delete("/:id", AdminController.deleteFromDB)
router.delete("/soft/:id", AdminController.softDeleteFromDB)


export const AdminRoutes = router;