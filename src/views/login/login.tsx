import { useState } from "react";
import { set, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ButtonApp } from "../../components/buttons/button";
import { InputApp } from "../../components/input/input";
import { Title } from "../../components/title/title";
import { loginForm, LoginForm } from "../../domain/datosForm";
import { authService } from "../../services/authService";
import "./login.css";
import { LoginRequestDTO } from "../../domain/Login";
import { useProfileImg } from "../../context/contextImg";

export const Login = () => {
  const [us, setUss] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const { setImg } = useProfileImg();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "all",
    defaultValues: loginForm,
  });

  const handleNavigation = () => {
    navigate("/home");
  };

  const handleLogin = async () => {
    const { user, password } = getValues(); 
    setUss(user);
    setPass(password);

    try {
      const credentials = LoginRequestDTO.fromDto(user, password);
      await authService.loginClient(credentials);
      handleNavigation();
      
      const img = sessionStorage.getItem("img") || ""; 
      setImg(img);
    } catch (error) {
      console.log(error as string);
    }
  };

  return (
    <>
      <div className="titleLogin">
        <Title title={"Event Nexus"} />
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
