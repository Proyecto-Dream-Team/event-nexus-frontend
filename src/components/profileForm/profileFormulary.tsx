import { InputApp } from "../input/input";
import './profileFormulary.css';
import { ButtonApp } from "./../buttons/button";
import { DatosForm } from "../../domain/datosForm";
import { useForm } from "react-hook-form";

interface ProfileFormularyProps {
    info: DatosForm;
}

export const ProfileFormulary = ({ info }: ProfileFormularyProps) => {

    const acept = () => {
        console.log('aceptar');
    };

    const cancel = () => {
        console.log('cancelar');
    };

    const {register,handleSubmit,formState: { errors },reset} = useForm({
        mode: "all",
        defaultValues: info,
    });

    return (
        <>
            <form className='profileFormulary' onSubmit={handleSubmit(acept)}>
                <InputApp
                    label="Nombre"
                    type="text"
                    register={register("nombre")}
                    readonly={true}
                    error={errors.nombre?.message || ""}
                />

                <InputApp
                    label="Apellido"
                    type="text"
                    register={register("apellido")}
                    readonly={true}
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
                        minLength: {
                            value: 5,
                            message: "Debe tener al menos 5 caracteres"
                        }
                    })}
                    readonly={false}
                    error={errors.direccion?.message || ""}
                />

                <div className="buttons">
                    <ButtonApp label="Cancelar" method={cancel} isCancel={true}/>
                    <ButtonApp label="Aceptar" method={acept} isCancel={false}/>
                </div>
            </form>
        </>
    );
};
