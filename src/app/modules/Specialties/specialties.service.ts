import { Request } from "express";
import { fileUploader } from "../../../helpers/fileUploader";
import prisma from "../../../shared/prisma";
import { Specialties } from "@prisma/client";

const insertIntoDB = async (req: Request) => {
    const file = req.file;

    if (file) {
        const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
        req.body.icon = uploadToCloudinary?.secure_url;
    }

    const result = await prisma.specialties.create({
        data: req.body
    });

    return result;
};


const getAllFromDB = async(): Promise<Specialties[]> => {
    const result = await prisma.specialties.findMany();

    return result;
};


const deleteFromDB = async (id: string) => {
    const result = await prisma.specialties.delete({
        where: {
            id,
        },
    });
    return result;
};


export const SpecialtiesService = {
    insertIntoDB,
    getAllFromDB,
    deleteFromDB
}