import React, { useState, useEffect, useRef } from 'react';
import { URL_SERVIDOR_REST } from '../utils/config';
import { NotificationDTO } from '../domain/notification';
import axios from 'axios';



export async function trySSE(
    setCounter:React.Dispatch<React.SetStateAction<number>>,
    setNewNotification:React.Dispatch<React.SetStateAction<NotificationDTO[]>>,
    userId:number,
    activeStatus:boolean,
    eventSource: EventSource | null
){

    if(activeStatus){
        eventSource?.close()
        console.log('Conexión SSE cerrada');
        // eventSource.close()
    }else{
        eventSource = new EventSource(`${URL_SERVIDOR_REST}/notification?userId=${userId.valueOf()}`);
        eventSource.onopen = (event:Event) => {
            console.log('Conexión SSE abierta');
        };
        eventSource.onerror = (error) => {
            console.log('Conexión SSE cerrada');
            eventSource?.close()
        };
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            try {
                if(data.type === 'new-notification'){
                    console.log(data.payload as NotificationDTO)
                    setCounter((prev) => prev + 1);
                    setNewNotification((prev) => [...prev, data.payload as NotificationDTO]);
                }
            } catch (error) {
                console.error('Error al parsear el evento SSE:', error);
            }
        };
    }

    

    // eventSource.addEventListener('heartbeat', (event) => {
    //     const timestamp = JSON.parse((event as MessageEvent).data);
    //     console.log('Heartbeat received at:', timestamp);
    //     // setCounter((prev) => prev + 1);
    //     // Aquí podrías resetear un temporizador de inactividad en el frontend si lo tuvieras
    // });
}

export async function getNotificationsByUserId(userId:number): Promise<NotificationDTO[]>{
    const response = await axios.get(`${URL_SERVIDOR_REST}/notification/${userId}`);
    return response.data
}

