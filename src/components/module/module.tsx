import './module.css'
import {  Module } from '../../domain/module'
import { useNavigate } from 'react-router-dom'
import { Card, Divider } from '@mui/material'
import EastIcon from '@mui/icons-material/East';

export const ModuleCard = ( {value} : {value : Module} ) => {

    const mapRoutes = { "Events":"all-events", "Directives":"noDefinido"}
    const nav = useNavigate()
   
    const navigate = () => {
        // quiero splitear y quedarme con la primer palabra del modulo
        const mapValue = value.name.split(" ")[0]
        const route = mapRoutes[mapValue as keyof typeof mapRoutes]

        nav(`/module-events/${route}`)
    }

    return(
        <>
            <Card onClick={() => navigate()}>

                    <div className='contenido-card'>
                        <div className='text'>
                            <h2>{value.name}</h2>
                            <br/>
                            <p>{value.description}</p>
                        </div>
                        <Divider orientation="vertical" variant="middle" flexItem />                    
                        
                        <img src= {`./icons/${value.image}`}/>  
                               
                        <div className='icono'>
                            <EastIcon fontSize="large" />
                        </div>
                    </div>
            </Card>
        
        </>
    )
}