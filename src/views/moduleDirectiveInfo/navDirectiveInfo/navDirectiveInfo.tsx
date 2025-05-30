import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import './navDirectiveInfo.css'

export const dividerStyles = {
    backgroundColor: "#ffffff",
    height: "2px",
    margin: "0 4rem 2rem 4rem",
}

export const NavDirectiveInfo = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [prevPath, setPrevPath] = useState<string | null>(null)

    useEffect(() => {
        setPrevPath(location.pathname)
    }, [location.pathname])

    const links = [
        { path: '/module-directive-info/read-info', label: 'Todas' },
        { path: '/module-directive-info/create-info', label: 'Crear' },
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
