import { datosForm, DatosForm } from "../../domain/datosForm"
import CreateIcon from '@mui/icons-material/Create';
import "./profileCard.css"
import { serviceUser } from "../../services/serviceUser";
import { useEffect, useState } from "react";
import { useProfileImg } from "../../context/contextImg";

interface profileForm{
    profileId: number
    work: string
}

export const ProfileCard = (profileForm: profileForm) => {
    const [datos, setDatos] = useState<DatosForm>(datosForm);

    const getDatos = async () => {
        try {
          const res = await serviceUser.getProfileDatos(profileForm.profileId);
          setDatos(res)
        } catch (error) {
          console.error("Error al obtener el perfil:", error);
        }
      }
    
    useEffect(() => {
        getDatos();
      }, []);

    return(
        <div className="profile-box">
                <div className="row">
                <div className="title">
                    <h2>{datos.apellido + " " + datos.nombre}</h2>
                    {profileForm.work}
                </div>
                <img className="image" src={useProfileImg().img}></img>
            </div>
            <div className='icon'>
                <CreateIcon fontSize="large" />
            </div>
        </div>
    )
}