import { useEffect, useState } from "react";
import { ProfileFormulary } from "../../components/profileForm/profileFormulary";
import { Title } from "../../components/title/title";
import { datosForm, DatosForm } from "../../domain/datosForm";
import { serviceUser } from "../../services/serviceUser";
import "./profile.css";
import { ProfileImg } from "../../components/profileImg/profileImg";

export const Profile = () => {
  const [datos, setDatos] = useState<DatosForm>(datosForm);
  const id = Number(sessionStorage.getItem("userId"));
  
  const getProfile = async () => {
    try {
      const res = await serviceUser.getProfileDatos(id);
      setDatos(res);
    } catch (error) {
      console.error("Error al obtener el perfil:", error);
    }
  };

  const changeImg = async (img: string) => {
    try {
      await serviceUser.updateImg(img);
    } catch (error) {
      console.error("Error al cambiar la imagen:", error);
    }
  }

  const changeData = async (data: DatosForm) => {
    try {
      await serviceUser.updateProfile(data);
      setDatos(data);
      console.log("Datos actualizados:", data);
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <Title title="Datos" />
      <ProfileImg change={changeImg}></ProfileImg>
      <ProfileFormulary info={datos} uploadData={changeData}/>
    </>
  );
};
