import { useForm } from "react-hook-form";
import { Title } from "../../../components/title/title"
import { InputApp } from "../../../components/input/input";
import { ButtonApp } from "../../../components/buttons/button";

class FormCreateUss {
    nombre: string = "";
    apellido: string = "";
    telefono: string = "";
    email: string = "";
    modulos: string[] = [];
    permisos: string[] = [];
}

export const CreateUss = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        mode: "all",
        defaultValues: new FormCreateUss(),
    });

     const cancelCreate = () => {
        reset(new FormCreateUss());
    }
    const createUss = (data: FormCreateUss) => {
        console.log(data);
    }


    return (
        <>
            <Title title={"Crear Usuario"} ></Title>

            <form className="profileFormulary">
                <InputApp
                    label="Nombre"
                    type="text"
                    register={register("nombre", {
                        required: "El nombre es obligatorio",
                        pattern: {
                            value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                            message: "Solo se permiten letras"
                        }
                    })}
                    readonly={false}
                    error={errors.nombre?.message || ""}
                />
                <InputApp
                    label="Apellido"
                    type="text"
                    register={register("apellido", {
                        required: "El apellido es obligatorio",
                        pattern: {
                            value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                            message: "Solo se permiten letras"
                        }
                    })}
                    readonly={false}
                    error={errors.apellido?.message || ""}
                />
                <InputApp
                    label="Telefono"
                    type="number"
                    register={register("telefono", {
                        required: "El teléfono es obligatorio",
                        pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Debe contener 10 dígitos"
                        }
                    })}
                    readonly={false}
                    error={errors.telefono?.message || ""}
                />
                <InputApp
                    label="E-Mail"
                    type="email"
                    register={register("email", {
                        required: "El email es obligatorio",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Correo electrónico inválido"
                        }
                    })}
                    readonly={false}
                    error={errors.email?.message || ""}
                />

                 <div className="buttons">
                        <ButtonApp label="Cancelar" method={cancelCreate} isCancel={true} />
                        <ButtonApp label="Aceptar" method={handleSubmit(createUss)} isCancel={false} />
                      </div>
            </form>


        </>
    )
}