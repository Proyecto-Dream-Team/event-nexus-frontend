import axios from 'axios' 
import { Module } from "../domain/module";
import { URL_SERVIDOR_REST } from "../utils/config";

class ModuleService {
    async getModules( id : number ) : Promise<Module[]>  {
        const response = await axios.get(`${URL_SERVIDOR_REST}/module/${id}/all`);
        return response.data
    }
}

export const moduleService = new ModuleService()