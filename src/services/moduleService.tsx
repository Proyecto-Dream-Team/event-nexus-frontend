import axios from 'axios' 
import { Module } from "../domain/module";
import { URL_SERVIDOR_REST } from "../utils/config";
import { CreateEventDTO } from '../domain/createEvent';

class ModuleService {
    async getEvents() {
        const response = await axios.get(`${URL_SERVIDOR_REST}/event`);
        return response.data
    }

    async getModules( id : number ) : Promise<Module[]>  {
        const response = await axios.get(`${URL_SERVIDOR_REST}/module/${id}`);
        return response.data
    }

    async create( data : CreateEventDTO )  {
        return await axios.post(`${URL_SERVIDOR_REST}/event/create`,data)
    }
}

export const moduleService = new ModuleService()