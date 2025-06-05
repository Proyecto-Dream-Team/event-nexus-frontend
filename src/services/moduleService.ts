import axios from 'axios'
import { Module } from "../domain/module";
import { URL_SERVIDOR_REST } from "../utils/config";
import { CreateEventDTO, EventDto, ResponseEntityDTO } from '../domain/createEvent';
import { EventType } from 'react-hook-form';

class ModuleService {

    async getEvents() {
        const response = await axios.get(`${URL_SERVIDOR_REST}/event`);
        return response.data
    }

    async employeeEvents(employeeId: number) {
        const response = await axios.get(`${URL_SERVIDOR_REST}/event/${employeeId}`);
        return response.data
    }

    async getModules(id: number): Promise<Module[]> {
        const response = await axios.get(`${URL_SERVIDOR_REST}/module/${id}`);
        return response.data
    }

    async create(data: CreateEventDTO) {
        return await axios.post(`${URL_SERVIDOR_REST}/event/create`, data)
    }

    async joinleaveEvent(eventId: number):Promise<ResponseEntityDTO> {
        const employeeId = Number(sessionStorage.getItem('userId'))
        const response = await axios.post(`${URL_SERVIDOR_REST}/event/join-leave?employeeId=${employeeId}&eventId=${eventId}`);
        return response.data
    }
}

export const moduleService = new ModuleService()

export async function getAvailableEvents():Promise<EventDto[]> {
    const userId:number = Number(sessionStorage.getItem('userId'))
    const response = await axios.get(`${URL_SERVIDOR_REST}/event/available/${userId}`);
    console.log("ALL EVENTS", response.data)
    return response.data
}

export async function getEvents():Promise<EventDto[]> {
    const userId:number = Number(sessionStorage.getItem('userId'))
    const response = await axios.get(`${URL_SERVIDOR_REST}/event/available/${userId}`);
    console.log("ALL EVENTS", response.data)
    return response.data
}

export async function getEventsByTitle(eventTitle: string):Promise<EventDto[]> {
    const response = await axios.get(`${URL_SERVIDOR_REST}/event/title?eventTitle=${eventTitle}`);
    console.log("BY TITLE", response.data)
    return response.data
}

export async function getEventsByCategory(eventCategory: string):Promise<EventDto[]> {
    const response = await axios.get(`${URL_SERVIDOR_REST}/event/type/${eventCategory}`);
    console.log("BY CATEGORY", response.data)
    return response.data
}

export async function getEventsByCreator():Promise<EventDto[]> {
    const userId:number = Number(sessionStorage.getItem('userId'))
    const response = await axios.get(`${URL_SERVIDOR_REST}/event/${userId}/created`);
    return response.data
}

export async function getEventsByInvitation():Promise<EventDto[]> {
    const userId:number = Number(sessionStorage.getItem('userId'))
    const response = await axios.get(`${URL_SERVIDOR_REST}/event/${userId}/invited`);   
    return response.data
}

// ////////////////////////////////////////////////////////////////////////////////////
// TIPOS DE EVENTOS
// ////////////////////////////////////////////////////////////////////////////////////
export async function getEventTypes():Promise<string[]> {
    const response = await axios.get(`${URL_SERVIDOR_REST}/event/type/all`);
    console.log("EVENT TYPES", response.data)   
    return response.data
}