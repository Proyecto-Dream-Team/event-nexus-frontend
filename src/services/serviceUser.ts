import axios from "axios";
import { DatosForm } from "../domain/datosForm";
import { URL_SERVIDOR_REST } from "../utils/config";

class ServiceUser {
  async getProfileDatos(id: number): Promise<DatosForm> {
    const response = await axios.get<DatosForm>(`${URL_SERVIDOR_REST}/user/profile/${id}`);
    const entity = DatosForm.fromDto(response.data);
    
    return entity;
  }
}

export const serviceUser = new ServiceUser();
