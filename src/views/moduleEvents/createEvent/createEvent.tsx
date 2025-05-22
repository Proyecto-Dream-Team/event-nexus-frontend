import { useForm } from "react-hook-form";
import { InputApp } from "../../../components/input/input"
import './createEvent.css'
import { ButtonApp } from "../../../components/buttons/button";
import { CreateEventDTO } from "../../../domain/createEvent";
import { moduleService } from "../../../services/moduleService";
import { EventType } from "../../../utils/typeEvent";
import { useLoader } from "../../../context/loader/useLoader";
import { TIMELOADER } from "../../../utils/config";
import { useToast } from "../../../context/toast/useToast";
import { RadioInput } from "../../../components/input/radioInput";
import { serviceUser } from "../../../services/serviceUser";
import { useEffect, useState } from "react";

export type PermissionType = "EVENT" | "DIRECTIVE" | "REPORT" | "ADMIN"

export const CreateEvent = () => {

    const userId = Number(sessionStorage.getItem('userId'))
    const { setIsLoading } = useLoader();
    const [permissions, setPermissions] = useState<string[]>([]);
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        mode: "all",
    });
    const {open} = useToast();

    const create = async (data : any) => {
        const { title, date, description, eventType } = data;

        const eventCreated = new CreateEventDTO(userId, date, title, description, eventType)
        try {
            setIsLoading(true)
            await moduleService.create(eventCreated)
            reset()
            setTimeout(() => {
                setIsLoading(false)
                open("Evento creado con exito", "success")
            }, TIMELOADER)
        } catch (e: any) {
            reset()
            open(e.response.data.message, "error")
        }
    }

    useEffect(() => {
        const getPermission = async () => {
            const response = await serviceUser.getPermissionsUser(userId , "EVENT" )
            setPermissions(response)
        }
		getPermission()
	}, []);

    return (
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
                <div className="event-type-selector">
                    <label className="input-label">Tipo de Evento</label>
                    <div className="event-type-options">
                    {permissions?.map((perm) => {
                        return (
                            <RadioInput
                            key={perm}
                            label={perm}
                            value={perm}
                            register={register("eventType", {
                                required: "El tipo de evento es obligatorio",
                            })}
                        />
                    );
                    })}
                    </div>
                    {errors.eventType?.message && (
                        <div className="error-container">
                        <p className="error-message">
                            {typeof errors.eventType?.message === "string" ? errors.eventType.message : ""}
                        </p>
                        </div>
                    )}
                </div>

                    <div className="buttonCreateEvent">
                <ButtonApp
                    label="Confirmar"
                    method={handleSubmit(create)}
                    isCancel={false}
                />
                </div>
            </form>
        </>
    )
}