import axios from 'axios' 
import { Module } from "../../domain/module";
import { REST_SERVER_URL } from "./urls";
class ModuleService {
    async getModules() : Promise<Module[]>  {
        const response = await axios.get(`${REST_SERVER_URL}/module/all`);
        return response.data
    }
}

export const moduleService = new ModuleService()