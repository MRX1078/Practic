import {axiosClassic, axiosWithAuth} from "@/api/interceptors";
import {UserMeeting} from "@/types/calendar.types";

export const calendarService = {
    async createMeeting(data: UserMeeting): Promise<any> {
        return await axiosClassic.post('meet', data);
    },
    async getMeetingById(id: number): Promise<any> {
        return await axiosClassic.get(`meet/get/${id}`);
    },
    async deleteMeeting(id: number): Promise<any> {
        await axiosClassic.delete(`meet/${id}`)
    },
    async createUser(data: UserMeeting): Promise<any> {
        return await axiosClassic.post('customer', data);
    },
    async getUserById(id: number): Promise<any> {
        return await axiosClassic.get(`customer/get/${id}`);
    },
    async createChild(data: UserMeeting): Promise<any> {
        return await axiosClassic.post('child', data);
    },
    async getNotifications(): Promise<any> {
        return await axiosWithAuth.get(`api/v1/General/leftMenu/notification`);
    },
    async getUserInfo(): Promise<any> {
        return await axiosWithAuth.get(`api/v1/General/leftMenu/get`);
    }


}