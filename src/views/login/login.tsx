import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ButtonApp } from "../../components/buttons/button";
import { HexagonBackground } from "../../components/hexagonBackground/hexagonBackg";
import { InputApp } from "../../components/input/input";
import { Title } from "../../components/title/title";
import { useProfileImg } from "../../context/contextImg";
import { LoginForm } from "../../domain/datosForm";
import { LoginRequestDTO } from "../../domain/Login";
import { authService } from "../../services/authService";
import "./login.css";
import { useLoader } from "../../context/loader/useLoader";

export const Login = () => {
  const [us, setUss] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const { setImg } = useProfileImg();
  const {setIsLoading} = useLoader();

  const {register,handleSubmit,getValues,formState: { errors }, reset,} = useForm<LoginForm>({
    mode: "all",
    defaultValues: {
      user: "",
      password: "",
    },
  });

  const handleNavigation = () => {
    navigate("/home");
  };

  const handleLogin = async () => {
    setIsLoading(true);
    const { user, password } = getValues();
    setUss(user);
    setPass(password);

    try {
      const credentials = LoginRequestDTO.fromDto(user, password);
      const loginSuccess = await authService.loginClient(credentials);

      if (loginSuccess) {
        const img = sessionStorage.getItem("img") || "";
        setImg(img);
        reset();
        setTimeout(() => {
          setIsLoading(false);
          handleNavigation();
        }, 2000);
      } else {
        console.log("Error al hacer login: Credenciales incorrectas");
        setTimeout(() => {
          setIsLoading(false);
          reset();
        }, 2000);
      }
    } catch (error) {
      console.log("Error al hacer login:", error);
    }
  };

  

  return (
    <>
      <div className="login-box">
    
        <HexagonBackground></HexagonBackground>
        <form className="loginFormulary">
          <Title title={"Event Nexus"} />
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

          <h2>Olvidaste tu contraseña?</h2>

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
