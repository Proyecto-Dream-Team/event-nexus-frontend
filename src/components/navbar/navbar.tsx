import { NavLink } from 'react-router-dom'
import './navbar.css'
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';

export const NavBar = () => {

    const sxIcons = { color: "white" };

    return(
        <>
            <nav className="nav">
                <NavLink to='/home'>
                    <HomeIcon style={{ ...sxIcons, fontSize: 35 }} />
                </NavLink>
                <NavLink to='/profile'>
                    <AccountBoxIcon style={{ ...sxIcons, fontSize: 35 }}></AccountBoxIcon>
                </NavLink>
                <NavLink to='/register'>
                    <LogoutIcon style={{ ...sxIcons, fontSize: 35 }}></LogoutIcon>
                </NavLink>
            </nav>
        </>
    )
}