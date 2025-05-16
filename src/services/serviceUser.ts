import axios from "axios";
import { DatosForm } from "../domain/datosForm";
import { PermissionsApp } from "../domain/permissions-description";
import { HeaderDto, SesionStorage } from "../domain/user";
import { FormCreateFormularyAdmin } from "../domain/User-Domain";
import { URL_SERVIDOR_REST } from "../utils/config";

class ServiceUser {
  	async createUss(newUser: FormCreateFormularyAdmin): Promise<void> {
    	await axios.post(`${URL_SERVIDOR_REST}/admin/create-user`, newUser);
  }

	async getPermissions(): Promise<PermissionsApp> {
		const res = await axios.get(`${URL_SERVIDOR_REST}/admin/permissions-role`);
		return res.data;
	}
  
	async getProfileDatos(id: number): Promise<DatosForm> {
		const response = await axios.get<DatosForm>(`${URL_SERVIDOR_REST}/user/profile/${id}`);
		const entity = DatosForm.fromDto(response.data);
		
		return entity;
	}

	async getHeaderData(id : number): Promise<HeaderDto> {
		const response = await axios.get(`${URL_SERVIDOR_REST}/user/header/${id}`);
		const entity = response.data;
		return HeaderDto.fromDto(entity);
	}

	async updateProfile(data: DatosForm): Promise<DatosForm> {
		const response = await axios.put<DatosForm>(`${URL_SERVIDOR_REST}/user/profile`, data);
		const entity = DatosForm.fromDto(response.data);
		return entity;
	}

	async updateImg(img: string): Promise<void> {
		const id = Number(sessionStorage.getItem("userId"));
		const update = { id, img };
		const res = await axios.put(`${URL_SERVIDOR_REST}/user/img`,update);
		console.log(res);
	}

	async search(text : string): Promise<SesionStorage[]> {
		const id = Number(sessionStorage.getItem("userId"));
		const response = await axios.get(`${URL_SERVIDOR_REST}/user`,
		{ params: { search : text}})
		// para qe no me traiga el usuario logueado, sino me elimino yo mismo
		return response.data.filter((user : SesionStorage) => user.id !== id);
		}
}



export const serviceUser = new ServiceUser();
