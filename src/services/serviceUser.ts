import axios from "axios";
import { DatosForm } from "../domain/datosForm";
import { HeaderDto, SesionStorage } from "../domain/user";
import { PermissionsApp, PermissionType } from "../utils/typeEvent";

class ServiceUser {


	async getPermissions(): Promise<PermissionsApp> {
		const url = process.env.REACT_APP_URL_SERVIDOR_REST;
		const res = await axios.get(`${url}/admin/permissions-role`);
		return res.data;
	}

	async getPermissionsUser(id: number, type: PermissionType): Promise<string[]> {
		const url = process.env.REACT_APP_URL_SERVIDOR_REST;
		const res = await axios.get(`${url}/user/permissions/${type}`);
		return res.data;
	}

	async getProfileDatos(id: number): Promise<DatosForm> {
		const url = process.env.REACT_APP_URL_SERVIDOR_REST;
		const response = await axios.get<DatosForm>(`${url}/user/profile`);
		const entity = DatosForm.fromDto(response.data);

		return entity;
	}

	async getHeaderData(id: number): Promise<HeaderDto> {
		const url = process.env.REACT_APP_URL_SERVIDOR_REST;
		const response = await axios.get(`${url}/user/header`);
		const entity = response.data;
		return HeaderDto.fromDto(entity);
	}

	async updateProfile(data: DatosForm): Promise<DatosForm> {
		const url = process.env.REACT_APP_URL_SERVIDOR_REST;
		const response = await axios.put<DatosForm>(`${url}/user/profile`, data);
		const entity = DatosForm.fromDto(response.data);
		return entity;
	}

	async updateImg(img: string): Promise<void> {
		const url = process.env.REACT_APP_URL_SERVIDOR_REST;
		const id = Number(sessionStorage.getItem("userId"));
		const update = { id, img };
		const res = await axios.put(`${url}/user/img`, update);
		console.log(res);
	}

	async search(text: string): Promise<SesionStorage[]> {
		const url = process.env.REACT_APP_URL_SERVIDOR_REST;
		const id = Number(sessionStorage.getItem("userId"));
		const response = await axios.get(`${url}/user`,
			{ params: { search: text } })
		// para qe no me traiga el usuario logueado, sino me elimino yo mismo
		return response.data.filter((user: SesionStorage) => user.id !== id);
	}
}



export const serviceUser = new ServiceUser();
