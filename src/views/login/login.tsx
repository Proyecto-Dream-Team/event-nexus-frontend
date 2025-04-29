import { useEffect, useState } from "react";
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
      const loginSuccess = await authService.loginClient(credentials);

      if (loginSuccess) {
        handleNavigation();
        const img = sessionStorage.getItem("img") || "";
        setImg(img);
      } else {
        console.error("Credenciales inválidas");
        // Mostrar algún error al usuario si querés
      }
    } catch (error) {
      console.log("Error al hacer login:", error);
    }
  };

  const hexPath = (cx: number, cy: number, size: number) => {
    const angle_deg = 60;
    const angle_rad = Math.PI / 180 * angle_deg;
    const points = Array.from({ length: 6 }).map((_, i) => {
      const x = cx + size * Math.cos(angle_rad * i);
      const y = cy + size * Math.sin(angle_rad * i);
      return `${x},${y}`;
    });
    return points.join(" ");
  };

  const size = 18;

  // Coordenadas para la disposición deseada
  const positions = [
    { cx: 89, cy: 45 },   // Top hexagon
    { cx: 59, cy: 60 },   // Bottom left
    { cx: 90, cy: 78 },  // Bottom right
    { cx: 60, cy: 93 },  // Final center-bottom
  ];

  return (
    <>
      <div className="login-box">
      {/* <svg width="150" height="150" xmlns="http://www.w3.org/2000/svg">
      
        {positions.map((pos, idx) => (
          <polygon
            key={idx}
            points={hexPath(pos.cx, pos.cy, size)}
            stroke="#0C2A4C"
            strokeWidth="1"
            fill="none"
            className={`glow-polygon-${idx}`}
            style={{ zIndex: 10, position: "relative" }}
          />
        ))}
            </svg> */}
            {/* <style>
            {`
            ${positions.map(
            (_, idx) => `
            .glow-polygon-${idx} {
              animation: loaderAnimation-${idx} 0.5s linear ${idx *0.5}s forwards;
              z-index: 4;
            }

            @keyframes loaderAnimation-${idx} {
              0% {
              stroke-dasharray: 1, 100;
              }
              50% {
              stroke-dasharray: 50, 100;
              }
              100% {
                stroke-dasharray: 1, 100;
                fill: #0C2A4C;
              }
            }
            `
            ).join("\n")}
            `}
            </style> */}
      <div className="nightFondo">
        {Array.from({ length: 30 }).map((_, index) => (
            <div
            key={index}
            className="hexagon"
            style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            }}
            ></div>
        ))}
      </div>
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
