import axios, { AxiosResponse } from "axios";
import { URL_SERVIDOR_REST } from "../utils/config";
import { FormCreateFormularyAdmin, FormCreateUss } from "../domain/User-Domain";
import { Form } from "react-router-dom";

class AdminService {

    async deleteUser(employeeId: number): Promise<AxiosResponse> {
        const res = await axios.delete(`${URL_SERVIDOR_REST}/admin/delete/user/${employeeId}`);
        return res;
    }

    async getUser(id: number): Promise<FormCreateUss> {
        const res = await axios.get(`${URL_SERVIDOR_REST}/admin/edit-user/${id}`);
        const user = res.data;
        console.log(user);
        const us = new FormCreateUss(
            user.id,
            user.name,
            user.lastName,
            user.email,
            user.address,
            user.phone,
            user.permissions,
            user.role
        );
        return us;
    }

}



export const adminService = new AdminService();

