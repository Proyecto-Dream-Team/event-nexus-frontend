import React, { useState, useEffect, useRef } from 'react';
import { URL_SERVIDOR_REST } from '../utils/config';

interface NuevoEvento {
    id: string;
    nombre: string;
    timestamp: string;
}

export async function mock(){
    // const [notificaciones, setNotificaciones] = useState<NuevoEvento[]>([]);
    const userId = '1'; // Reemplaza con la forma de obtener el ID del 
    const inactivityTimeout = useRef<number | null>(null);
    // 
    const eventSource = new EventSource(`${URL_SERVIDOR_REST}/notification?userId=1`);
    eventSource.onopen = () => {
        console.log('Conexión SSE abierta');
    };

    eventSource.onerror = (error) => {
        console.error('Error en la conexión SSE:', error);
        eventSource.close()
        // Posiblemente intentar reconectar
    };

    eventSource.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            console.log(data)
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

