import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Login } from './views/login';
import { Home } from './views/home';
import { Profile } from './views/profile';

export const AppRouter = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Login /> } path='login'></Route>

                <Route element={<Login /> } path='register'></Route>
                <Route element={<Home /> } path='home'></Route>
                <Route element={<Profile /> } path='profile'></Route>

                <Route path="/" element={<Navigate to="/login" />}></Route>{/* por defecto me lleva al login */}
                <Route path="*" element={<Home />}></Route>{/* momentaneamente redirecciona al home si la ruta se escribe mal */}
            </Routes>
        </BrowserRouter>
    );

}