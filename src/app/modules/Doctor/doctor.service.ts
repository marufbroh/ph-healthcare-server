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

        if(specialties && specialties.length> 0){
            const deleteSpecialtiesIds = specialties.filter(specialty => specialty.isDeleted);

            for (const specialty of deleteSpecialtiesIds) {
                const deleteDoctorSpecialties = await transactionClient.doctorSpecialties.deleteMany({
                    where: {
                        doctorId: doctorInfo.id,
                        specialitiesId: specialty.specialitiesId
                    }
                });
            };


            const createSpecialtiesIds = specialties.filter(specialty => specialty.isDeleted === false);

            for (const specialty of createSpecialtiesIds) {
                const createDoctorSpecialties = await transactionClient.doctorSpecialties.create({
                    data: {
                        doctorId: doctorInfo.id,
                        specialitiesId: specialty.specialitiesId
                    }
                });
            };


        }

        


        return updatedDoctorData;

    });

    return result;
}

export const DoctorService = {
    updateIntoDB
};