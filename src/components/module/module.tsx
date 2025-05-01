import './module.css'
import {  Module } from '../../domain/module'
import { useNavigate } from 'react-router-dom'
import { Box, Card, Divider } from '@mui/material'
import EastIcon from '@mui/icons-material/East';

export const ModuleCard = ( {value} : {value : Module} ) => {

    const mapRoutes = { "events":"all-events", "directives":"noDefinido"}
    const nav = useNavigate()
   
    const navigate = () => {
        // quiero splitear y quedarme con la primer palabra del modulo
        const mapValue = value.name.split(" ")[0].toLowerCase()
        const route = mapRoutes[mapValue as keyof typeof mapRoutes]

        nav(`/module-events/${route}`)
    }

    return(
        <>
            <Card className="card" onClick={() => navigate()}>

                    <div className='contenido-card'>
                        <div>
                            <h2>{value.name}</h2>
                            <br/>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi officia porro numquam blanditiis itaque.</p>
                        </div>
                        <Divider orientation="vertical" variant="middle" flexItem />                    
                        
                        <img src={value.image}/>
                               
                    </div>
                    <EastIcon fontSize="large" />
                    
            </Card>
        
        </>
    )
}