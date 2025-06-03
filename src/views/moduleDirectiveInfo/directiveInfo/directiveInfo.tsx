import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { ButtonApp } from "../../../components/buttons/button";
import { InputApp } from "../../../components/input/input";
import { DirectiveInfoData } from "../../../domain/directiveInfo";
import { directiveInfoService, fetchDirectives } from "../../../services/directiveInfoService";
import { useToast } from "../../../context/toast/useToast";
import { use, useEffect, useState } from "react";
import { CardDirectiveInfo } from "./cardDirectiveInfo/cardDirectiveInfo";

const defaultValuesForm = {
    titulo: "",
    fecha: "",
    descripcion: ""
};


export const DirectiveInfo = () => {
    const location = useLocation();
    const isCreateInfo = location.pathname.includes("create-info");
    const idUser = Number(sessionStorage.getItem("userId")) || 0;
    const [directives,setDirectives] = useState<DirectiveInfoData[]>([]);   
    const {open} = useToast();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        mode: "all",
        defaultValues: defaultValuesForm
    });


    const cancelCreate = () => {
        reset(defaultValuesForm);
    };

    async function getDirectives() {
        try {
            const response = await fetchDirectives();
            setDirectives(response);
        } catch (error: any) {
            open("Error al obtener las directivas: " + error.message, "error");
        }
    }
    const createInfo = async (data: any) => {
        const { titulo, fecha, descripcion } = data
        const myCreation = new DirectiveInfoData(idUser, titulo, fecha, descripcion);
        try{
            directiveInfoService.createDirectiveInfo(myCreation)
            reset(defaultValuesForm);
            open("Información creada correctamente", "success");
        } catch (error: any) {
            open("Error al crear la información: " + error.message, "error");   
        }
    }


    useEffect(() => {
        getDirectives();
    }, []);


    return (
        <>
            {isCreateInfo ? (
                <div className="">
                    <form className="profileFormulary" >
                        <InputApp label={"Titulo"} type={""} register={register("titulo", {
                            required: "El título es obligatorio",
                            pattern: {
                                value: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/,
                                message: "Solo se permiten letras y números"
                            }
                        })} readonly={false} error={errors.titulo?.message || ""} />

                        <InputApp label={"Fecha"} type={"date"} register={register("fecha", {
                            required: "La fecha es obligatoria"
                        })} readonly={false}
                            error={errors.fecha?.message || ""} />

                        <InputApp label={"Descripcion"} type={""} register={register("descripcion", {
                            required: "La descripción es obligatoria"
                        })} readonly={false} error={errors.descripcion?.message || ""} />


                        <div className="buttons">
                            <ButtonApp label="Cancelar" method={cancelCreate} isCancel={true} />
                            <ButtonApp label="Aceptar" method={handleSubmit(createInfo)} isCancel={false} />
                        </div>
                    </form>
                </div>
            ) : (
                <div className="directive-info-view">
                    {directives.map((directive) => ( 
                        <CardDirectiveInfo key={directive.creatorId} info={directive} funcDelete={() => {}} />
                    ))}
                    
                </div>
            )}
        </>
    );
};
