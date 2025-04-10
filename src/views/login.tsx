import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DatosForm } from "../../domain/datosForm";
import { InputApp } from '../components/input/input'
import './login.css'
import { useForm } from "react-hook-form";
import { ButtonApp } from '../components/buttons/button';
import { LoginForm } from '../domain/datosForm';
import { authService } from '../services/authService';

interface ProfileFormularyProps {
    info: LoginForm;
}


export const Login = ({ info }: ProfileFormularyProps) => {
    const [username,setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const {register,handleSubmit,formState: { errors },reset} = useForm({
        mode: "all",
        defaultValues: info,
    });
    const handleNavigation = (path: string) => {
        navigate("/home")
      }

    const handleLogin = async () => {
        if (info.user == "" || info.password == "") {
            return
          }
        setUsername(info.user)
        setPassword(info.password)
        try {
            const loginResponse = await authService.loginClient({ username, password })
            localStorage.setItem("userData",JSON.stringify(loginResponse.data))
            const userDataString = localStorage.getItem("userData")
  
            if (!userDataString) {
              throw new Error("LS vacío");
            }
  
            const data = JSON.parse(userDataString)
            const userId: string = data.id
            const userName: string = data.username
            const userRole: string = data.rol.toLowerCase()
            localStorage.setItem("userId", userId)
            localStorage.setItem("userName", userName)
            localStorage.setItem("userRole", userRole)
  
            
            handleNavigation("home")
  
          } catch (error) {
              console.log(error as String)
          }
    };

    return(
        <div className='page'>
            <h1 className='title'>Event Nexus</h1>
            <hr className='line'></hr>

            <div className='login-box'>
                <br></br>
                <form className='profileFormulary' onSubmit={handleSubmit(handleLogin)}>
                <InputApp
                    label="usuario"
                    type="text"
                    register={register("user", {
                        required: "El usuario es obligatorio",
                    })}
                    readonly={false}
                    error={errors.user?.message || ""}
                />
                <InputApp
                    label="contraseña"
                    type="text"
                    register={register("password", {
                        required: "El usuario es obligatorio",
                    })}
                    readonly={false}
                    error={ errors.password?.message || ""}
                />
                </form>

                <ButtonApp label="Iniciar Sesion" method={handleLogin} isCancel={false}/>

            </div>
        </div>
    )

}