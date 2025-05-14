import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ButtonApp } from "../../../components/buttons/button";
import { BoxInput } from "../../../components/input/boxInput";
import { InputApp } from "../../../components/input/input";
import { Title } from "../../../components/title/title";
import "./createUss.css";

class FormCreateUss {
    nombre: string = "";
    apellido: string = "";
    telefono: string = "";
    email: string = "";
    direccion: string = "";
    modulos: string[] = [];
    permisos: string[] = [];
}

export const CreateUss = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        mode: "all",
        defaultValues: new FormCreateUss(),
    });

    const [permisos, setPermisos] = useState<string[]>([]);

    const cancelCreate = () => {
        reset(new FormCreateUss());
    };

    const createUss = (data: FormCreateUss) => {
        console.log(data);
    };

    useEffect(() => {
        // debería obtener los permisos y los módulos de la API
        // const fetchPermissions = async () => {
        //     try {
        //         const permissions = await serviceUser.getPermissions();
        //         console.log(permissions);
        //         setPermisos(permissions.data);
        //     } catch (error) {
        //         console.error("Error fetching permissions:", error);
        //     }
        // };
        // fetchPermissions();
    }, []);

    return (
        <>
            <Title title={"Crear Usuario"} />

            <form className="profileFormulary" onSubmit={handleSubmit(createUss)}>
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
                <InputApp
                    label="Direccion"
                    type="text"
                    register={register("direccion", {
                        required: "La dirección es obligatoria",
                        pattern: {
                            value: /^[a-zA-Z0-9\s,.-áéíóúÁÉÍÓÚñÑ]+$/,
                            message: "La dirección contiene caracteres inválidos"
                        }
                    })}
                    readonly={false}
                    error={errors.direccion?.message || ""}
                />
{/* 
                <Title title={"Módulos"}></Title>
                <div className="checksArea">
                    <BoxInput label={"diego"} value={"3"} register={register(
                        "modulos", {
                        required: "El módulo es obligatorio",
                    }
                    )} >
                    </BoxInput>
                </div>
                 */}

                <div className='error-containerCheckbox'>
                    {errors.modulos?.message && <span className="error-msjCheckbox">{errors.modulos.message}</span>}
                </div>

                <Title title={"Permisos"} />
                <div className="checksArea">
                    <BoxInput label={"pepe"} value={"3"} register={register(
                        "permisos", {
                            required: "El permiso es obligatorio",
                        }
                    )} >
                    </BoxInput>
                </div>
                <div className='error-containerCheckbox'>
                    {errors.permisos?.message && <span className="error-msjCheckbox">{errors.permisos.message}</span>}
                </div>

                <div className="buttons">
                    <ButtonApp label="Cancelar" method={cancelCreate} isCancel={true} />
                    <ButtonApp label="Aceptar" method={handleSubmit(createUss)} isCancel={false} />
                </div>
            </form>
        </>
    );
};
