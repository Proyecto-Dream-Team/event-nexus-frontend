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
import { ProfileCard } from "../../../components/profileCard/profileCard";
import { DatosForm } from "../../../domain/datosForm";
import { TIMELOADER } from "../../../utils/config";
import { useLoader } from "../../../context/loader/useLoader";



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
       try{
              setIsLoading(true);
           const {nombre, apellido, email, permisos, roles} = getValues();
           const newUser = new FormCreateFormularyAdmin(nombre, apellido, email, permisos, roles[0]);
           await serviceUser.createUss(newUser);
           setTimeout(() => {
            setIsLoading(false);
            open("Usuario creado correctamente", "success");
            reset(new FormCreateUss());
              }, TIMELOADER);
       } catch (error) {
        
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
                <div className='error-containerCheckbox'>
                    {errors.modulos?.message && <span className="error-msjCheckbox">{errors.modulos.message}</span>}
                </div>
                 */}


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
                        {errors.permisos?.message && <span className="error-msjCheckbox">{errors.permisos.message}</span>}
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
