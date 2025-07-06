import React, { useState, useEffect, useRef } from 'react';
import { URL_SERVIDOR_REST } from '../utils/config';
import { NotificationDTO } from '../domain/notification';
import axios from 'axios';
import { ToastOptions } from '../context/toast/useToast';



export function trySSE(
    setCounter: React.Dispatch<React.SetStateAction<number>>,
    setNewNotification: React.Dispatch<React.SetStateAction<NotificationDTO[]>>,
    eventSourceInstance: EventSource,
    onOpenFunction: (message: string, option: ToastOptions) => void
) {

    eventSourceInstance.onopen = (event: Event) => {
        console.log('Conexión SSE abierta');
    };
    
    eventSourceInstance.onerror = (error) => {
        eventSourceInstance?.close()
        console.log('Conexión SSE cerrada');
    };
    eventSourceInstance.onmessage = (event) => {
        const data = JSON.parse(event.data);
        try {
            if (data.type === 'new-notification') {
                console.log(data.payload as NotificationDTO)
                setCounter((prev) => prev + 1);
                setNewNotification((prev) => [...prev, data.payload as NotificationDTO]);
                onOpenFunction('Nueva notificación recibida', 'info');
            }
        } catch (error) {
            console.error('Error al parsear el evento SSE:', error);
        }
    };

    
    // eventSourceInstance.addEventListener('heartbeat', (event) => {
    //     const timestamp = JSON.parse((event as MessageEvent).data);
    //     console.log('Heartbeat received at:', timestamp);
    //     // setCounter((prev) => prev + 1);
    //     // Aquí podrías resetear un temporizador de inactividad en el frontend si lo tuvieras
    // });
}

export async function getNotificationsByUserId(userId: number): Promise<NotificationDTO[]> {
    const response = await axios.get(`${URL_SERVIDOR_REST}/notification/employee`);
    return response.data
}

