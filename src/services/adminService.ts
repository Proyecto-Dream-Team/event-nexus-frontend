import axios, { AxiosResponse } from "axios";
import { URL_SERVIDOR_REST } from "../utils/config";

class AdminService {

    async deleteUser(employeeId: number): Promise<AxiosResponse> {
        const res = await axios.delete(`${URL_SERVIDOR_REST}/admin/delete/user/${employeeId}`);
        return res;
    }

}


export const adminService = new AdminService();

