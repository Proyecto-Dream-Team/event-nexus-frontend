import React, { useState, useEffect, useRef } from 'react';
import { URL_SERVIDOR_REST } from '../utils/config';
import { NotificationDTO } from '../domain/notification';
import axios from 'axios';

interface NuevoEvento {
    id: string;
    nombre: string;
    timestamp: string;
}

export async function trySSE(notificationSetter:React.Dispatch<React.SetStateAction<NotificationDTO[]>>){
    // const [notificaciones, setNotificaciones] = useState<NuevoEvento[]>([]);
    const userId:number = Number(localStorage.getItem('userId')); // Reemplaza con la forma de obtener el ID del 
    // const inactivityTimeout = useRef<number | null>(null);
    // 
    const eventSource = new EventSource(`${URL_SERVIDOR_REST}/notification?userId=${userId}`);

    eventSource.onopen = () => {
        console.log('Conexión SSE abierta');
    };
    eventSource.onerror = (error) => {
        console.error('Error en la conexión SSE:', error);
        eventSource.close()
        // Posiblemente intentar reconectar
    };
    eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        try {
            if(data.type === 'new-notification'){
                console.log(data.payload as NotificationDTO)
                notificationSetter((prev) => [...prev, data.payload as NotificationDTO]);
            }
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
        // Aquí podrías resetear un temporizador de inactividad en el frontend si lo tuvieras
    });
}

export async function getNotificationsByUserId(userId:number): Promise<NotificationDTO[]>{
    const response = await axios.get(`${URL_SERVIDOR_REST}/notification/${userId}`);
    return response.data
}

