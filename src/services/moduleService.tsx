import axios from 'axios' 
import { Module } from "../domain/module";
import { REST_SERVER_URL } from "./urls";

class ModuleService {
    async getModules( id : number ) : Promise<Module[]>  {
        const response = await axios.get(`${REST_SERVER_URL}/module/${id}/all`);
        return response.data
    }
}

export const moduleService = new ModuleService()