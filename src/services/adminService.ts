import axios, { AxiosResponse } from "axios";
import { FormCreateFormularyAdmin, FormCreateUss } from "../domain/User-Domain";


class AdminService {
    
    async deleteUser(employeeId: number): Promise<AxiosResponse> {
        const url = process.env.REACT_APP_URL_SERVIDOR_REST;
        const res = await axios.delete(`${url}/admin/delete/user/${employeeId}`);
        return res;
    }

    async getUser(id: number): Promise<FormCreateUss> {
        const url = process.env.REACT_APP_URL_SERVIDOR_REST;
        const res = await axios.get(`${url}/admin/edit-user/${id}`);
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
            const url = process.env.REACT_APP_URL_SERVIDOR_REST;
            await axios.put(`${url}/admin/edit-user`, newUser);
        }
        async createUss(newUser: FormCreateFormularyAdmin): Promise<void> {
            const url = process.env.REACT_APP_URL_SERVIDOR_REST;
            await axios.post(`${url}/admin/create-user`, newUser);
      }

}



export const adminService = new AdminService();

