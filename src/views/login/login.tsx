import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ButtonApp } from "../../components/buttons/button";
import { InputApp } from "../../components/input/input";
import { Title } from "../../components/title/title";
import { loginForm, LoginForm } from "../../domain/datosForm";
import { authService } from "../../services/authService";
import "./login.css";
import { LoginRequestDTO } from "../../data/dtos/LoginRequestDTO";

export const Login = () => {
  const [us, setUss] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const {register,handleSubmit,getValues,formState: { errors }, reset} = useForm<LoginForm>({
    mode: "all",
    defaultValues: loginForm,
  });

  
  const handleNavigation = () => {
    console.log("Login successful", us, pass);
    navigate("/home");
  };
  
  const handleLogin = async () => {
    const { user, password } = getValues(); // obtengo valores del formulario 
    setUss(user);
    setPass(password);

    try {
      const credentials = LoginRequestDTO.fromDto(user, password);
      await authService.loginClient(credentials);
      handleNavigation();
    } catch (error) {
      console.log(error as string);
    }
  };


  return (
    <>
      <div className="titleLogin">
        <Title title={"Event Nexus"}></Title>
      </div>

        <div className="login-box">
          <form className="profileFormulary">
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

            <div className="buttonsLogin">
              <ButtonApp
                label="Ingresar"
                method={handleSubmit(handleLogin)}
                isCancel={false}
              />
            </div>
          </form>
        </div>
    </>
  );
};
