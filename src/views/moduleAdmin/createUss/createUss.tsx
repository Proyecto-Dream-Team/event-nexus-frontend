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
import { useLoader } from "../../../context/loader/useLoader";
import { TIMELOADER } from "../../../utils/config";



export const CreateUss = () => {
    const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm({
        mode: "all",
        defaultValues: new FormCreateUss(),
    });

    const [permisos, setPermisos] = useState<string[]>([]);
    const [roles, setRoles] = useState<string[]>([]);
    const { open } = useToast();
    const {setIsLoading} = useLoader();

    const cancelCreate = () => {
        reset(new FormCreateUss());
    };
    const createUss = async (data: FormCreateUss) => {    
        try {
            setIsLoading(true);
            const { nombre, apellido, email, direccion, telefono, permisos, roles } = getValues();
            const newUser = new FormCreateFormularyAdmin(
                nombre,
                apellido,
                email,
                direccion,
                telefono,
                permisos,
                roles[0]
            );
            await serviceUser.createUss(newUser);
            setTimeout(() => {
                setIsLoading(false);
                open("Usuario creado correctamente", "success");
                reset(new FormCreateUss());
            }, TIMELOADER);
        } catch (error) {
            setIsLoading(false);
            open("Error al crear el usuario", "error");
        }

        console.log(data);
    };

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const res = await serviceUser.getPermissions();
                const permissions = res.permissions;
                const roles = res.roles;
                setPermisos(permissions);
                setRoles(roles);

                console.log(permissions);
                console.log(roles);

                // open("Permisos cargados correctamente",  "success")
            } catch (error) {
                open("Permisos cargados correctamente", "error")
            }
        };
        fetchPermissions();
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
                            value: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/,
                            message: "Solo se permiten letras y números"
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
                            value: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/,
                            message: "Solo se permiten letras y números"
                        }
                    })}
                    readonly={false}
                    error={errors.apellido?.message || ""}
                />
                <InputApp
                    label="Dirección"
                    type="text"
                    register={register("direccion", {
                        required: "La dirección es obligatoria",
                        pattern: {
                            value: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/,
                            message: "Solo se permiten letras y números"
                        }
                    })}
                    readonly={false}
                    error={errors.direccion?.message || ""}
                />
                <InputApp
                    label="Teléfono"
                    type="number"
                    register={register("telefono", {
                        required: "El teléfono es obligatorio",
                        pattern: {
                            value: /^[0-9]+$/,
                            message: "Solo se permiten números"
                        },
                        minLength: {
                            value: 5,
                            message: "El teléfono debe tener al menos 5 dígitos"
                        },
                        maxLength: {
                            value: 15,
                            message: "El teléfono debe tener como máximo 15 dígitos"
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

                <Title title={"Permisos"} />
                <div className="checksArea">
                    {permisos.map((permiso, index) => (
                        <BoxInput
                            key={index}
                            label={permiso}
                            value={permiso}
                            register={register("permisos", {
                                required: "El permiso es obligatorio",
                            })}
                        />
                    ))}
                </div>
                <div className='error-containerCheckbox'>
                    {errors.permisos?.message && <span className="error-msjCheckbox">{errors.permisos.message}</span>}
                </div>

                <Title title={"Roles"} />
                <div className="checksArea">
                    {roles.map((role, index) => (
                        <BoxInput
                            key={index}
                            label={role}
                            value={role}
                            register={register("roles", {
                                required: "El rol es obligatorio",
                            })}
                        />
                    ))}
                    <div className='error-containerCheckbox'>
                        {errors.roles?.message && <span className="error-msjCheckbox">{errors.roles.message}</span>}
                    </div>
                </div>
                <div className="buttons">
                    <ButtonApp label="Cancelar" method={cancelCreate} isCancel={true} />
                    <ButtonApp label="Aceptar" method={handleSubmit(createUss)} isCancel={false} />
                </div>
            </form>
        </>
    );
};
