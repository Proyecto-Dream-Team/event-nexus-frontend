import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { ButtonApp } from '../components/buttons/button';
import { InputApp } from '../components/input/input';
import { LoginForm } from '../domain/datosForm';
import { authService } from '../services/authService';
import './login.css';

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const {register,handleSubmit,getValues,formState: { errors },reset} = useForm<LoginForm>({
        mode: "all",
        defaultValues: {
            user: "",
            password: ""
        }
    });

    const handleNavigation = () => {
        navigate("/home");
    };

    const handleLogin = async () => {
        const { user, password } = getValues();
        setUsername(user);
        setPassword(password);

        try {
            const loginResponse = await authService.loginClient({ username: user, password });
            localStorage.setItem("userData", JSON.stringify(loginResponse.data));

            const userDataString = localStorage.getItem("userData");

            if (!userDataString) {
                throw new Error("LS vacío");
            }

            const data = JSON.parse(userDataString);
            const userId: string = data.id;
            const userName: string = data.username;
            const userRole: string = data.rol;

            localStorage.setItem("userId", userId);
            localStorage.setItem("userName", userName);
            localStorage.setItem("userRole", userRole);

            handleNavigation();
        } catch (error) {
            console.log(error as string);
        }
    };


    return (
        <div className='page'>
            <h1 className='title'>Event Nexus</h1>
            <hr className='line' />

            <div className='login-box'>
                <form className='profileFormulary' >
                    <InputApp
                        label="usuario"
                        type="text"
                        register={register("user", {
                            required: "El usuario es obligatorio"
                        })}
                        error={errors.user?.message || ""} 
                        readonly={false}
                        />

                    <InputApp
                        label="contraseña"
                        type="password"
                        register={register("password", {
                            required: "La contraseña es obligatoria"
                        })}
                        error={errors.password?.message || ""} 
                        readonly={false}
                        />

                    <ButtonApp label="Iniciar Sesión" method={handleSubmit(handleLogin)} isCancel={false} />
                </form>
            </div>
        </div>
    );
};
