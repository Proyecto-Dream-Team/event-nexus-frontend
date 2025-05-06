import { Divider } from "@mui/material"
import './navEvents.css'
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

export const dividerStyles = {
    backgroundColor: "#ffffff",
    height: "2px",
    margin: "0 4rem 2rem 4rem",
}

export const NavEvents = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [prevPath, setPrevPath] = useState<string | null>(null)

    useEffect(() => {
        setPrevPath(location.pathname)
    }, [location.pathname])

    const links = [
        { path: '/module-events/all-events', label: 'Eventos' },
        { path: '/module-events/my-events', label: 'Participo' },
        { path: '/module-events/create-event', label: 'Crear' },
    ]

    return (
        <nav className="navegacion">
            {links.map(({ path, label }) => {
                const isActive = location.pathname === path
                const wasActive = prevPath === path && !isActive
                return (
                    <a
                        key={path}
                        className={`nav-link ${isActive ? 'activo' : ''} ${wasActive ? 'desactivo' : ''}`}
                        onClick={() => navigate(path)}
                    >
                        {label}
                    </a>
                )
            })}
        </nav>
    )
}
