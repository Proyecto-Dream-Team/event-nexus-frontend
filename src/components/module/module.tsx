import './module.css'
import { Module } from '../../domain/module'
import { useNavigate } from 'react-router-dom'
import {  Card } from '@mui/material'
import EastIcon from '@mui/icons-material/East';

export const ModuleCard = (
    { value, setIndex, maxLenght }: {
        value: Module,
        setIndex: React.Dispatch<React.SetStateAction<number>>,
        maxLenght:number
    }
) => {

    const mapRoutes = {
        "eventos": "/module-events/events",
        "informacion": "/module-directive-info",
        "comunicarse": "/module-admin/search-user"

    };

    const nav = useNavigate();

    const navigate = () => {
        const mapValue = value.name.split(" ")[0].toLowerCase();
        console.log(mapValue)
        const routeKey = Object.keys(mapRoutes).find(key => key.toLowerCase() === mapValue);
        console.log(routeKey)
        if (routeKey) {
            const route = mapRoutes[routeKey as keyof typeof mapRoutes];
            nav(route);
        } else {
            console.error("No se encontró una ruta para el módulo:", value.name);
        }
    };
    return (
        <>

            <Card className='card' component={'article'}>
                <div className='contenido-card'>
                    <h3 className='title'>{value.name}</h3>
                    <p className='text'>{value.description}</p>
                    <img src={`./icons/${value.image}`} className='icon-module' />
                    <div className='icono' onClick={navigate}>
                        <EastIcon fontSize="large" />
                    </div>
                </div>
            </Card>
        </>
    );
};