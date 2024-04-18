import prisma from "../../../shared/prisma"

const updateIntoDB = async (id: string, payload: any) => {
    const { specialties, ...doctorData } = payload;

    const doctorInfo = await prisma.doctor.findUniqueOrThrow({
        where: {
            id: id
        }
    });

    const result = await prisma.$transaction(async (transactionClient) => {
        const updatedDoctorData = transactionClient.doctor.update({
            where: {
                id
            },
            data: doctorData,
            include: {
                doctorSpecialties: true
            }
        });

        for (const specialtiesId of specialties) {
            const createDoctorSpecialties = await transactionClient.doctorSpecialties.create({
                data: {
                    doctorId: doctorInfo.id,
                    specialitiesId: specialtiesId
                }
            })
        };


        return updatedDoctorData;

    })

    return result;
}

export const DoctorService = {
    updateIntoDB
}