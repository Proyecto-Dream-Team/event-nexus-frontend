import axios from 'axios'
import { Module } from "../domain/module";
import { CreateEventDTO, EventDto, ResponseEntityDTO } from '../domain/createEvent';
import { EventType } from 'react-hook-form';
import { EventCategory } from '../domain/eventTypes';


class ModuleService {
    async getEvents() {
        const url = process.env.REACT_APP_URL_SERVIDOR_REST;
        const response = await axios.get(`${url}/event`);
        return response.data
    }

    async employeeEvents(employeeId: number) {
        const url = process.env.REACT_APP_URL_SERVIDOR_REST;
        const response = await axios.get(`${url}/event/created`);
        return response.data
    }

    async getModules(id: number): Promise<Module[]> {
        const url = process.env.REACT_APP_URL_SERVIDOR_REST;
        const response = await axios.get(`${url}/module`);
        return response.data
    }

    async create(data: CreateEventDTO) {
        const url = process.env.REACT_APP_URL_SERVIDOR_REST;
        return await axios.post(`${url}/event/create`, data)
    }

    async joinleaveEvent(eventId: number): Promise<ResponseEntityDTO> {
        const url = process.env.REACT_APP_URL_SERVIDOR_REST;
        const employeeId = Number(sessionStorage.getItem('userId'))
        const response = await axios.post(`${url}/event/join-leave?eventId=${eventId}`);
        return response.data
    }
}

export const moduleService = new ModuleService()

// export async function getAvailableEvents():Promise<EventDto[]> {
//     const userId:number = Number(sessionStorage.getItem('userId'))
//     const response = await axios.get(`${REACT_APP_URL_SERVIDOR_REST}/event/available`);
//     console.log("ALL EVENTS", response.data)
//     return response.data
// }

export async function getEvents(): Promise<EventDto[]> {
    const url = process.env.REACT_APP_URL_SERVIDOR_REST;
    const userId: number = Number(sessionStorage.getItem('userId'))
    const response = await axios.get(`${url}/event/available`);
    console.log("ALL EVENTS", response.data)
    return response.data
}

export async function getEventsByTitle(eventTitle: string): Promise<EventDto[]> {
    const url = process.env.REACT_APP_URL_SERVIDOR_REST;
    const response = await axios.get(`${url}/event/title?eventTitle=${eventTitle}`);
    console.log("BY TITLE", response.data)
    return response.data
}

export async function getEventsByCategory(eventCategory: string): Promise<EventDto[]> {
    const url = process.env.REACT_APP_URL_SERVIDOR_REST;
    const response = await axios.get(`${url}/event/type/${eventCategory}`);
    console.log("BY CATEGORY", response.data)
    return response.data
}

export async function getEventsByCreator(): Promise<EventDto[]> {
    const url = process.env.REACT_APP_URL_SERVIDOR_REST;
    const userId: number = Number(sessionStorage.getItem('userId'))
    const response = await axios.get(`${url}/event/created`);
    return response.data
}

export async function getEventsByInvitation(): Promise<EventDto[]> {
    const url = process.env.REACT_APP_URL_SERVIDOR_REST;
    const userId: number = Number(sessionStorage.getItem('userId'))
    const response = await axios.get(`${url}/event/invited`);
    return response.data
}

// ////////////////////////////////////////////////////////////////////////////////////
// TIPOS DE EVENTOS
// ////////////////////////////////////////////////////////////////////////////////////
export async function getEventTypes(): Promise<EventCategory[]> {
    const url = process.env.REACT_APP_URL_SERVIDOR_REST;
    const response = await axios.get(`${url}/event/type/all`);
    console.log("EVENT TYPES", response.data)
    return response.data
}

export async function deleteEvent(eventId: number): Promise<string> {
    const url = process.env.REACT_APP_URL_SERVIDOR_REST;
    const response = await axios.delete(`${url}/event?eventId=${eventId}`);
    return response.data
}