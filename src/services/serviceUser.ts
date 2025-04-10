import { DatosForm, datosForm } from "../domain/datosForm";

class ServiceUser {
  async getProfileDatos(id: number): Promise<DatosForm> {
    return datosForm; // mock local
  }
}

export const serviceUser = new ServiceUser();
