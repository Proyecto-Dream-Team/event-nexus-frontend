import { useEffect, useState } from 'react';
import { ProfileFormulary } from '../../components/profileForm/profileFormulary';
import './profile.css';
import { serviceUser } from '../../services/serviceUser';
import { datosForm, DatosForm } from '../../domain/datosForm';
import { Title } from '../../components/title/title';

export const Profile = () => {
  const [datos, setDatos] = useState<DatosForm>(datosForm);
  const id = Number(sessionStorage.getItem('userId'));

  const getProfile = async () => {
    try {
      const res = await serviceUser.getProfileDatos(id);
      setDatos(res);
    } catch (error) {
      console.error("Error al obtener el perfil:", error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <Title title='Datos' />
      <ProfileFormulary info={datos} />
    </>
  );
};
