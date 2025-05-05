import { NavLink } from 'react-router-dom'
import './navbar.css'
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';

export const NavBar = () => {

    // const sxIcons = { color: "white" };

    return(
        <>
            <nav className="nav">
                <NavLink 
                    to='/home'
                    className={({ isActive }) => isActive ? 'activo' : 'inactivo'}
                >
                    <HomeIcon 
                        style={{  fontSize: 35 }}
                    />
                </NavLink>
                <NavLink 
                    to='/profile'
                    className={({ isActive }) => isActive ? 'activo' : 'inactivo'}
                >
                    <AccountBoxIcon style={{ fontSize: 35 }}/>
                </NavLink>
                <NavLink 
                    to='/login' 
                    onClick={() => {sessionStorage.clear();}}
                    className={({ isActive }) => isActive ? 'activo' : 'inactivo'}
                >
                    <LogoutIcon style={{  fontSize: 35 }}/>
                </NavLink>
            </nav>
        </>
    )
}