import { useForm } from "react-hook-form";
import { InputApp } from "../../../components/input/input"
import { useState } from "react";
import './createEvent.css'
import { ButtonApp } from "../../../components/buttons/button";
export const CreateEvent = () => {
    
    const {register,handleSubmit,getValues,formState: { errors }} = useForm({
        mode: "all",
    });

    const [title,setTitle] = useState()
    const [date,setDate] = useState()
    const [description,setDescription] = useState()

    const create = () => {
        const { title , date , description } = getValues()
        setTitle(title)
        setDate(date)
        setDescription(description)


    }
    
    return(
        <>
        <form>
            <InputApp
                label="Titulo"
                type="text"
                register={register("title", {
                    required: "El titulo es obligatorio",
                })}
                error={errors.title?.message || ""}
                readonly={false}
            />
            <InputApp
                label="Fecha"
                type="date"
                register={register("date", {
                    required: "La fecha es obligatoria",
                })}
                error={errors.date?.message || ""}
                readonly={false}
            />
            <InputApp
                label="Descripcion"
                type="text"
                register={register("description", {
                    required: "La Descripcion es oblogatoria",
                })}
                error={errors.description?.message || ""}
                readonly={false}
            />
            <ButtonApp
                label="Confirmar"
                method={handleSubmit(create)}
                isCancel={false}
              />
        </form>
        </>
    )
}