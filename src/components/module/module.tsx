import './module.css'
import {  Module } from '../../domain/module'
import { useNavigate } from 'react-router-dom'

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
            <article className="button-square" onClick={navigate}>
                <h2>{value.name}</h2>
                <img src={value.image}  />
            </article>
        </>
    )
}