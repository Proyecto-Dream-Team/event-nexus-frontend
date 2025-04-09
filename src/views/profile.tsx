import { useEffect, useState } from 'react';
import { ProfileFormulary } from '../components/profileForm/profileFormulary';
import './profile.css';
import { datosForm, DatosForm } from '../domain/datosForm';
import { serviceUser } from '../components/services/serviceUser';


export const Profile = () => {
    const [datos, setDatos] = useState<DatosForm>(datosForm);

    useEffect(() => {
        const getProfile = async () => {
            const datos = await serviceUser.getProfileDatos(1);
            setDatos(datos);
            console.log(datos);
        };
        getProfile();
    }, []);

    return (
        <>
            <div className="profileOptins">
                <a href="" className='menuProfile'>Datos</a>
                <a href="Admin" className='menuProfile'>Admin</a>
            </div>
            <ProfileFormulary info={datos}></ProfileFormulary>
        </>
    )

}