import './module.css'
import { Module } from '../../domain/module'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Divider, IconButton } from '@mui/material'
import EastIcon from '@mui/icons-material/East';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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

            <Card className='card' >
                <IconButton
                    onClick={(e) => (setIndex((prev) => prev == 0 ? 2 : prev - 1))}
                    sx={{ width: 'fit-content', height: 'fit-content' }}
                    className='arrow__back'>
                    <ArrowBackIcon></ArrowBackIcon>
                </IconButton>
                <div className='contenido-card'>

                    <p className='text'>{value.description}</p>
                    {/* <Divider orientation="vertical" variant="middle" flexItem /> */}
                    <img src={`./icons/${value.image}`} className='icon-module' />
                    <div className='icono' onClick={navigate}>
                        <EastIcon fontSize="large" />
                    </div>
                </div>
                <IconButton
                    onClick={(e) => (setIndex((prev) => prev == maxLenght-1 ? 0 : prev + 1))}
                    sx={{ width: 'fit-content', height: 'fit-content' }}
                    className='arrow__forward'>
                    <ArrowForwardIcon></ArrowForwardIcon>
                </IconButton>
            </Card>
        </>
    );
};