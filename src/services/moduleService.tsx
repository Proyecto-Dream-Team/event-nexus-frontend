import axios from 'axios' 
import { Module } from "../domain/module";
import { URL_SERVIDOR_REST } from "../utils/config";
import { CreateEventDTO } from '../domain/createEvent';

class ModuleService {
    async getEvents() {
        const response = await axios.get(`${URL_SERVIDOR_REST}/event`);
        return response.data
    }

    async employeeEvents(employeeId:number) {
        const response = await axios.get(`${URL_SERVIDOR_REST}/event/${employeeId}`);
        return response.data
    }

    async getModules( id : number ) : Promise<Module[]>  {
        const response = await axios.get(`${URL_SERVIDOR_REST}/module/${id}`);
        return response.data
    }

    async create( data : CreateEventDTO )  {
        return await axios.post(`${URL_SERVIDOR_REST}/event/create`,data)
    }

    async joinEvent(eventId:number) {
        const employeeId = Number(sessionStorage.getItem('userId'))
        const response = await axios.post(`${URL_SERVIDOR_REST}/event/join`,
            {param:{
                employeeId:employeeId,
                eventId:eventId
            }}
        );
        return response.data
    }

    async leaveEvent(eventId:number) {
        const employeeId = Number(sessionStorage.getItem('userId'))
        const response = await axios.post(
            `${URL_SERVIDOR_REST}/event/leave`,
            employeeId,
            eventId
        );
        return response.data
    }
}

export const moduleService = new ModuleService()