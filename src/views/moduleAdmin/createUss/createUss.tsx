import { useEffect, useState } from "react";
import { get, useForm } from "react-hook-form";
import { ButtonApp } from "../../../components/buttons/button";
import { BoxInput } from "../../../components/input/boxInput";
import { InputApp } from "../../../components/input/input";
import { Title } from "../../../components/title/title";
import "./createUss.css";
import { serviceUser } from "../../../services/serviceUser";
import { useToast } from "../../../context/toast/useToast";
import { FormCreateFormularyAdmin, FormCreateUss } from "../../../domain/User-Domain";
import { TIMELOADER } from "../../../utils/config";
import { useLoader } from "../../../context/loader/useLoader";
import { RadioInput } from "../../../components/input/radioInput";
import { UserForm } from "../../../components/userForm/userForm";



export const CreateUss = () => {

    
    const { open } = useToast();
    const {setIsLoading} = useLoader();

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


    return (
        <>
            {/* <Title title={"Crear Usuario"} /> */}

          <UserForm userForm = {new FormCreateUss} click = {createUss}></UserForm>
        </>
    );
};
