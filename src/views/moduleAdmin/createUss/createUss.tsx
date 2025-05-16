import { use, useEffect, useState } from "react";
import { UserForm } from "../../../components/userForm/userForm";
import { useLoader } from "../../../context/loader/useLoader";
import { useToast } from "../../../context/toast/useToast";
import { FormCreateFormularyAdmin, FormCreateUss } from "../../../domain/User-Domain";
import { serviceUser } from "../../../services/serviceUser";
import { TIMELOADER } from "../../../utils/config";
import "./createUss.css";
import { useLocation, useParams } from "react-router-dom";



export const CreateUss = () => {

    
    const { open } = useToast();
    const {setIsLoading} = useLoader();
    const location = useLocation();
    const param = useParams();
    const isCreate = location.pathname === "/module-admin/create-user";
    const [user, setUser] = useState<FormCreateUss>(new FormCreateUss());

    const createUss = async (data: FormCreateUss) => {    
        try {
            setIsLoading(true);
            const { nombre, apellido, email, direccion, telefono, permisos, roles } = data;
            const newUser = new FormCreateFormularyAdmin(
                nombre,
                apellido,
                email,
                direccion,
                telefono,
                permisos,
                Array.isArray(roles) ? "" : roles // Cambiar a roles[0] si es un array
            );
            await serviceUser.createUss(newUser);
            setTimeout(() => {
                setIsLoading(false);
                open("Usuario creado correctamente", "success");
                // reset(new FormCreateUss());
            }, TIMELOADER);
        } catch (error) {
            setIsLoading(false);
            open("Error al crear el usuario", "error");
        }

        console.log(data);
    };
    
    useEffect(() => {
        const fetchData = async () => {
            if (isCreate) {
                setUser(new FormCreateUss());
            }else {
                console.log(param.id);
            }
        }
        fetchData();

    }, []);

    return (
        <>
            {/* <Title title={"Crear Usuario"} /> */}

          <UserForm userForm = {user} click = {createUss}></UserForm>
        </>
    );
};
