import { useEffect, useState } from 'react';
import { ProfileFormulary } from '../../components/profileForm/profileFormulary';
import './profile.css';
import { serviceUser } from '../../components/services/serviceUser';
import { datosForm, DatosForm } from '../../domain/datosForm';


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
            <div className="profileOptions">
                <h2 className='menuProfile'>Datos</h2>
            </div>
            <ProfileFormulary info={datos}></ProfileFormulary>
        </>


    )

}