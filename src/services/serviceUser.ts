import axios from "axios";
import { DatosForm } from "../domain/datosForm";
import { URL_SERVIDOR_REST } from "../utils/config";
import { HeaderDto } from "../domain/user";

class ServiceUser {
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

}



export const serviceUser = new ServiceUser();
