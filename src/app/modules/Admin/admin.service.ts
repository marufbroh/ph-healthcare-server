import { Admin, Prisma } from "@prisma/client";
import { paginationHelper } from "../../../helpars/paginationHelper";
import prisma from "../../../shared/prisma";
import { adminSearchableFields } from "./admin.constant";

const getAllFromDB = async (params: any, options: any) => {
    const { page,
        limit,
        skip,
        sortBy,
        sortOrder } = paginationHelper.calculatePagination(options);
    const { searchTerm, ...filterData } = params;
    const andConditions: Prisma.AdminWhereInput[] = [];


    if (params.searchTerm) {
        andConditions.push({
            OR: adminSearchableFields.map((field) => ({
                [field]: {
                    contains: params.searchTerm,
                    mode: 'insensitive'
                }

            }))
        })
    };

    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: filterData[key]
                }
            }))
        })
    }

    const whereConditions: Prisma.AdminWhereInput = { AND: andConditions }

    const result = await prisma.admin.findMany({
        where: whereConditions,
        skip: skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder ? {
            [options.sortBy]: options.sortOrder
        } : {
            createdAt: 'desc'
        }
    });

    const total = await prisma.admin.count({
        where: whereConditions
    });

    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    }
};



const getByIdFromDB = async (id: string) => {
    const result = await prisma.admin.findUnique({
        where: {
            id: id
        }
    });

    return result;
}


const updateIntoDB = async (id: string, data: Partial<Admin>) => {
    console.log("updated");

    const result = await prisma.admin.update({
        where: {
            id: id
        },
        data
    });

    return result;
}


export const AdminService = {
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB,
}