import './module.css'
import { Module } from '../../domain/module'
import { useNavigate } from 'react-router-dom'
import {  Card } from '@mui/material'
import EastIcon from '@mui/icons-material/East';
import ConeIcon from '../svgComponent/svgComponent';
import { adminModuleIcon, directivetModuleIcon, eventModuleIcon, notificationIcon } from '../../utils/svgIcons';

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
        "administración": "/module-admin/search-user"
    };

    function mapSvgIcon(imagePath:string){
        if(imagePath=='events.svg'){return <ConeIcon className='icon-module' svgContent={eventModuleIcon}></ConeIcon>}
        if(imagePath=='information.svg'){return <ConeIcon className='icon-module'svgContent={directivetModuleIcon}></ConeIcon>}
        if(imagePath=='admin.svg'){return <ConeIcon className='icon-module'svgContent={adminModuleIcon}></ConeIcon>}
        if(imagePath=='notification.svg'){return <ConeIcon className='icon-module'svgContent={notificationIcon}></ConeIcon>}
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
                    {/* <ConeIcon></ConeIcon> */}
                    {mapSvgIcon(value.image)}
                    {/* <img src={`./icons/${value.image}`} className='icon-module'/> */}
                    <div className='icono' onClick={navigate}>
                        <EastIcon fontSize="large" style={{color:'var(--fixed-text-color-light)'}} />
                    </div>
                </div>
            </Card>
        </>
    );
};