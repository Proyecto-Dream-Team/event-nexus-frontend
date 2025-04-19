import { Divider } from "@mui/material"
import './navEvents.css'
import { useLocation, useNavigate } from "react-router-dom"

export const dividerStyles = {
    backgroundColor: "#ffffff",
    height: "2px",
    margin: "0 4rem 2rem 4rem",
}

export const NavEvents = () => {

    const navigate = useNavigate()
    const location = useLocation()
    return(
        <>
            <nav className = "navegacion" >
                <a 
                    className= {location.pathname === '/module-events/events' ? 'activo' : ''}
                    onClick={() => navigate('/module-events/events')}
                >
                    Eventos
                </a>

                <a 
                    className = {location.pathname === '/module-events/participate' ? 'activo' : ''}
                    onClick={() => navigate('/module-events/participate')}
                >
                    Participo
                </a>

                <a 
                    onClick={() => navigate('/module-events/create')}
                    className = {location.pathname === '/module-events/create' ? 'activo' : ''}
                >
                    Crear
                </a>
            </nav>
            <Divider style = { dividerStyles }/>
        </>
    )
}