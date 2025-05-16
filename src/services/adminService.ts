import axios, { AxiosResponse } from "axios";
import { FormCreateFormularyAdmin, FormCreateUss } from "../domain/User-Domain";
import { URL_SERVIDOR_REST } from "../utils/config";

class AdminService {

    async deleteUser(employeeId: number): Promise<AxiosResponse> {
        const res = await axios.delete(`${URL_SERVIDOR_REST}/admin/delete/user/${employeeId}`);
        return res;
    }

    async getUser(id: number): Promise<FormCreateUss> {
        const res = await axios.get(`${URL_SERVIDOR_REST}/admin/edit-user/${id}`);
        const user = res.data;
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

        async updateUss(newUser: FormCreateFormularyAdmin) : Promise<void> {
            console.log(newUser);
            await axios.put(`${URL_SERVIDOR_REST}/admin/edit-user`, newUser);
        }
        async createUss(newUser: FormCreateFormularyAdmin): Promise<void> {
            await axios.post(`${URL_SERVIDOR_REST}/admin/create-user`, newUser);
      }

}



export const adminService = new AdminService();

