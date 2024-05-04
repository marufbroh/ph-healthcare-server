import { addHours, format } from 'date-fns';

const inserIntoDB = async (payload: any) => {
    const { startDate, endDate, startTime, endTime } = payload;

    const currentDate = new Date(startDate);
    const lastDate = new Date(endDate)

    
};

export const ScheduleService = {
    inserIntoDB
}