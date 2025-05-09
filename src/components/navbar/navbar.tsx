import { NavLink, useNavigate } from 'react-router-dom';
import './navbar.css';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import { useLoader } from '../../context/loader/useLoader';
import { TIMELOADER } from '../../utils/config';

export const NavBar = () => {
    const { setIsLoading } = useLoader();
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsLoading(true);
        sessionStorage.clear();
        setTimeout(() => {
            setIsLoading(false);
            navigate('/login'); // redirige recién después del loader
        }, TIMELOADER);
    };

    return (
        <nav className="nav">
            <NavLink
                to='/home'
                className={({ isActive }) => isActive ? 'activo' : 'inactivo'}
            >
                <HomeIcon style={{ fontSize: 35 }} />
            </NavLink>

            <NavLink
                to='/profile'
                className={({ isActive }) => isActive ? 'activo' : 'inactivo'}
            >
                <AccountBoxIcon style={{ fontSize: 35 }} />
            </NavLink>

            <button 
                onClick={handleLogout}
                className='logOut' // o manejar manualmente la clase activa si querés
                style={{ cursor: 'pointer' }}
            >
                <LogoutIcon style={{ fontSize: 35 }} />
            </button>
        </nav>
    );
};
