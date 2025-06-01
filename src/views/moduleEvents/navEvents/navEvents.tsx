import { NavLink } from "react-router-dom"
import './navEvents.css'
import { useEffect } from "react"

export const dividerStyles = {
    backgroundColor: "#ffffff",
    height: "2px",
    margin: "0 4rem 2rem 4rem",
}

export const NavEvents = () => {
    const links = [
        { index: 0, path: '/module-events/all-events', label: 'Eventos' },
        { index: 1, path: '/module-events/my-events', label: 'Mis eventos' },
        { index: 2, path: '/module-events/create-event', label: 'Crear' },
    ]

    return (
        <nav className="navegacion">
            {links.map(({ index, path, label }) => {
                return (
                    <NavLink
                        key={index}
                        to={path}
                        className={({ isActive, isPending }) =>
                            isPending ? "nav-link desactivo" : isActive ? "nav-link activo" : "nav-link"
                        }
                    >
                        {label}
                    </NavLink>
                )
            })}
        </nav>
    )
}
