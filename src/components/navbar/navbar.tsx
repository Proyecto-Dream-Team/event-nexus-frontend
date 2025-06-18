import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './navbar.css';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import { useLoader } from '../../context/loader/useLoader';
import { TIMELOADER } from '../../utils/config';

export const NavBar = () => {
    const { setIsLoading } = useLoader();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        setIsLoading(true);
        sessionStorage.clear();
        setTimeout(() => {
            setIsLoading(false);
            navigate('/login'); // redirige después del loader
        }, TIMELOADER);
    };

    const isHomeOrProfile = () => {
        return location.pathname === '/home' || location.pathname === '/profile'
    };

    return (
        <>
            {isHomeOrProfile() && (
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
                        className='logOut'
                        style={{ cursor: 'pointer' }}
                    >
                        <LogoutIcon style={{ fontSize: 35 }} />
                    </button>
                </nav>
            )}
        </>
    );
};
