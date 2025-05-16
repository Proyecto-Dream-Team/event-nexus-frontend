import { useForm } from 'react-hook-form';
import { FormCreateUss } from '../../domain/User-Domain';
import { ButtonApp } from '../buttons/button';
import { InputApp } from '../input/input';
import { Title } from '../title/title';
import './userForm.css';
import { useEffect, useState } from 'react';
import { serviceUser } from '../../services/serviceUser';
import { BoxInput } from '../input/boxInput';
import { RadioInput } from '../input/radioInput';

interface FormularyProps {
    userForm: FormCreateUss;
    click: (data: FormCreateUss) => void;
}

export const UserForm = ({ userForm, click }: FormularyProps) => {

    const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm({
        mode: "all",
        defaultValues: userForm,
    });

    const [permisos, setPermisos] = useState<string[]>([]);
    const [roles, setRoles] = useState<string[]>([]);

    const cancelCreate = () => {
        reset(new FormCreateUss());
    };

    useEffect(() => {
        if (
            !userForm ||
            (!userForm.permisos?.length && !userForm.roles?.length)
        ) {
            const fetchPermissions = async () => {
                const res = await serviceUser.getPermissions();
                setPermisos(res.permissions);
                setRoles(res.roles);
            };
            fetchPermissions();
        } else {
            setPermisos(userForm.permisos || []);
            setRoles(userForm.roles || []);
        }
    }, []);

    return (
        <>
            <form className="profileFormulary" onSubmit={handleSubmit(click)}>
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
                        <RadioInput
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
                    <ButtonApp label="Aceptar" method={handleSubmit(click)} isCancel={false} />
                </div>
            </form>
        </>
    )
}