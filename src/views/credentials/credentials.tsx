import { useLocation } from "react-router-dom";
import { HexagonBackground } from "../../components/hexagonBackground/hexagonBackg";
import { Title } from "../../components/title/title";
import { InputApp } from "../../components/input/input";
import { get, useForm } from "react-hook-form";
import { LoginForm } from "../../domain/datosForm";
import { BaseSyntheticEvent } from "react";
import { ButtonApp } from "../../components/buttons/button";
import './credentials.css'
import { CredentialsDto, CredentialsForm } from "../../domain/credentials";
import { credentialService } from "../../services/credentials.service";

export const CredentialsComponent = () => {


    const location = useLocation();
    const isRecovery = location.pathname === '/recovery';



    const { register, handleSubmit, getValues, reset, formState: { errors } } = useForm<CredentialsForm>({
        mode: "all",
        defaultValues: {
            user: "",
            password: "",
            mail: "",

        },
    });

    const createUser = async (data: CredentialsForm): Promise<void> => {
        const { mail, user, password, confirmPassword } = getValues();
        if (password == confirmPassword) {
            console.log("hola");
            const credentials = new CredentialsDto(data);
            await credentialService.confirmCredentials(credentials);
        }
    }

    return (
        <div className="credentials-box">
            <HexagonBackground></HexagonBackground>
            <form className="credentialsFormulary">
                {!isRecovery ? <Title title={"Crear cuenta"} /> : <Title title={"Recuperar cuenta"} />}
                <InputApp
                    label="E-mail"
                    type="text"
                    register={register("mail", {
                        required: "El usuario es obligatorio",
                    })}
                    error={errors.mail?.message || ""}
                    readonly={false}
                />
                <InputApp
                    label="Usuario"
                    type="text"
                    register={register("user", {
                        required: "El usuario es obligatorio",
                    })}
                    error={errors.user?.message || ""}
                    readonly={false}
                />

                <InputApp
                    label="Contraseña"
                    type="password"
                    register={register("password", {
                        required: "La contraseña es obligatoria",
                    })}
                    error={errors.password?.message || ""}
                    readonly={false}
                />
                <InputApp
                    label="Contraseña"
                    type="password"
                    register={register("confirmPassword", {
                        required: "La contraseña es obligatoria",
                    })}
                    error={errors.password?.message || ""}
                    readonly={false}
                />

                <div className="buttonsLogin">
                    <ButtonApp
                        label="Crear cuenta"
                        method={handleSubmit(createUser)}
                        isCancel={false}
                    />
                </div>
            </form>
        </div>
    )



}