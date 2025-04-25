import { useForm } from "react-hook-form";
import { InputApp } from "../../../components/input/input"
import './createEvent.css'
import { ButtonApp } from "../../../components/buttons/button";
import { CreateEventDTO } from "../../../domain/createEvent";
import { moduleService } from "../../../services/moduleService";
export const CreateEvent = () => {
    
    const userId = Number(sessionStorage.getItem('userId'))

    const {register,handleSubmit,getValues,formState: { errors }} = useForm({
        mode: "all",
    });

    const create = async () => {
        const { title , date , description } = getValues()


        const eventCreated  = new CreateEventDTO(userId,[],date,title,description)
        try {
            await moduleService.create(eventCreated)
            console.log("creado con exito")
        } catch(e : any){
            console.log(e.message)
        }
        
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
                readonly={false}    
                error={typeof errors.title?.message === "string" ? errors.title?.message : ""}
                />
            <InputApp
                label="Fecha"
                type="datetime-local"
                register={register("date", {
                    required: "La fecha es obligatoria",
                })}
                readonly={false}
                error={typeof errors.date?.message === "string" ? errors.date?.message : ""}
                />
            <InputApp
                label="Descripcion"
                type="text"
                register={register("description", {
                    required: "La Descripcion es oblogatoria",
                })}
                readonly={false}
                error={typeof errors.description?.message === "string" ? errors.description?.message : ""}
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