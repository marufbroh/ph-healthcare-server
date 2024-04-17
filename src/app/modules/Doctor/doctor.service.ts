import prisma from "../../../shared/prisma"

const updateIntoDB = async (id: string, payload: any) => {
    const doctorData = await prisma.doctor.findUniqueOrThrow({
        where: {
            id: id
        }
    });

    const updatedDoctorData = prisma.doctor.update({
        where: {
            id
        },
        data: payload
    });

    return updatedDoctorData;
}

export const DoctorService = {
    updateIntoDB
}