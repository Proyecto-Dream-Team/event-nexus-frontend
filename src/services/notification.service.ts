import React, { useState, useEffect, useRef } from 'react';
import { URL_SERVIDOR_REST } from '../utils/config';
import { NotificationDTO } from '../domain/notification';
import axios from 'axios';



export function trySSE(setCounter:React.Dispatch<React.SetStateAction<number>>){

    // const userId:number = Number(sessionStorage.getItem('userId'));
    // const eventSource = new EventSource(`${URL_SERVIDOR_REST}/notification?userId=${userId}`);
    const eventSource = new EventSource(`${URL_SERVIDOR_REST}/notification?userId=1`);

    // eventSource.readyState\
    console.log(eventSource)
    eventSource.onopen = (event) => {
        console.log(event)
        console.log('Conexión SSE abierta');
    };
    eventSource.onerror = (error) => {
        console.error('Error en la conexión SSE:', error.composedPath);
        console.error('Error path:', error.composedPath);
        console.error('Current target:', error.currentTarget);
        console.error('Phase:', error.eventPhase);
        eventSource.close()
        // Posiblemente intentar reconectar
    };
    eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setCounter((prev) => prev + 1);
        console.log(data)
        try {
            // if(data.type === 'new-notification'){
            //     console.log(data.payload as NotificationDTO)
            //     notificationSetter((prev) => [...prev, data.payload as NotificationDTO]);
            // }
            // console.log(data)
            // if (data.tipo === 'nuevo-evento') {
            //     console.log(data)
            //     // setNotificaciones((prev) => [...prev, data.payload as NuevoEvento]);
            // }
        } catch (error) {
            console.error('Error al parsear el evento SSE:', error);
        }
        // console.log(notificaciones)
    };

    eventSource.addEventListener('heartbeat', (event) => {
        const timestamp = JSON.parse((event as MessageEvent).data);
        console.log('Heartbeat received at:', timestamp);
        // setCounter((prev) => prev + 1);
        // Aquí podrías resetear un temporizador de inactividad en el frontend si lo tuvieras
    });
}

export async function getNotificationsByUserId(userId:number): Promise<NotificationDTO[]>{
    const response = await axios.get(`${URL_SERVIDOR_REST}/notification/${userId}`);
    return response.data
}

