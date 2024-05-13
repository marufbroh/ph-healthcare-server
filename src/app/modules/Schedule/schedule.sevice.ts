import { addHours, format } from 'date-fns';

const inserIntoDB = async (payload: any) => {
    const { startDate, endDate, startTime, endTime } = payload;

    const currentDate = new Date(startDate);
    const lastDate = new Date(endDate)

    while(currentDate <= lastDate){
        const startDateTime = new Date(
            addHours(
                `${format(currentDate, 'YYYY-MM-DD')}`,
                Number(startTime.split(':')[0])
            )
        );


        const endDateTime = new Date(
            addHours(
                `${format(lastDate, 'YYYY-MM-DD')}`,
                Number(endTime.split(':')[0])
            )
        );

        while(startDateTime <= endDateTime){
            console.log("Pore korbo Next.js sesh kore");
        }
    }
};

export const ScheduleService = {
    inserIntoDB
}