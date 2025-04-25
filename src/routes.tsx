import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ViewLayout } from './components/viewLayout/viewLayout';
import { Home } from './views/home/home';
import { Login } from './views/login/login';
import { Profile } from './views/profile/profile';
import { ModuleEvents } from './views/moduleEvents/moduleEvents';
import { CreateEvent } from './views/moduleEvents/createEvent/createEvent';
import { Events } from './views/moduleEvents/events/events';


export const AppRouter = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Login/> } path = 'login' ></Route>
                <Route element={<ViewLayout></ViewLayout>}>
                    <Route element={<Home /> } path = 'home' ></Route>
                    <Route element={<Profile /> } path = 'profile' ></Route>
                    <Route element={<ModuleEvents/>} path = 'module-events'>
                        <Route element= {<Events/>} path = 'all-events' ></Route>
                        <Route element= {<Events/>} path = 'my-events' ></Route>
                        <Route element = {<CreateEvent/>} path = 'create-event' ></Route>
                    </Route>
                </Route>
                <Route path="/" element={<Navigate to="/login" />}></Route>{/* por defecto me lleva al login */}
                <Route path="*" element={<Home />}></Route>{/* momentaneamente redirecciona al home si la ruta se escribe mal */}
            </Routes>
        </BrowserRouter>
    );

}