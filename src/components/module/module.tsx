import './module.css'
import { Module } from '../../domain/module'
import { useNavigate } from 'react-router-dom'
import { Card, Divider } from '@mui/material'
import EastIcon from '@mui/icons-material/East';

export const ModuleCard = ({ value }: { value: Module }) => {
    const mapRoutes = { "Events": "/module-events/all-events", "Comunicarse": "/module-admin/create-user" };
    const nav = useNavigate();

    const navigate = () => {
        // Normalizar el nombre del módulo y las claves del mapa para ignorar mayúsculas/minúsculas
        const mapValue = value.name.split(" ")[0].toLowerCase();
        const routeKey = Object.keys(mapRoutes).find(key => key.toLowerCase() === mapValue);

        if (routeKey) {
            const route = mapRoutes[routeKey as keyof typeof mapRoutes];
            nav(route);
        } else {
            console.error("No se encontró una ruta para el módulo:", value.name);
        }
    };

    return (
        <>
            <Card className='card' onClick={() => navigate()}>
                <div className='contenido-card'>
                    <div className='text'>
                        <h2>{value.name}</h2>
                        <br />
                        <p>{value.description}</p>
                    </div>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <img src={`./icons/${value.image}`} />
                    <div className='icono'>
                        <EastIcon fontSize="large" />
                    </div>
                </div>
            </Card>
        </>
    );
};