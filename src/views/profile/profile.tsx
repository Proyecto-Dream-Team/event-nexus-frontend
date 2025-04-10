import { useEffect, useState } from 'react';
import { ProfileFormulary } from '../../components/profileForm/profileFormulary';
import './profile.css';
import { serviceUser } from '../../services/serviceUser';
import { datosForm, DatosForm } from '../../domain/datosForm';
import { Title } from '../../components/title/title';


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
          <Title title='Datos'></Title>
            <ProfileFormulary info={datos}></ProfileFormulary>
        </>


    )

}