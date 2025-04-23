import { useState } from "react";
import { SesionStorage } from "../../domain/user";
import { ButtonApp } from "../buttons/button";
import "./event.css";

interface EventProps {
  user: SesionStorage;
  time: string;
  title: string;
  description: string;
  participants: number;
  isActive: boolean;
}

export const Event = ({
  user,
  time,
  title,
  description,
  participants,
  isActive,
}: EventProps) => {
  const [isOpen, ChangeOpen] = useState(false);

  const HandleOpen = () => {
    ChangeOpen(!isOpen);
  };

  const ArrowOpen = () => {
    if (isOpen) {
      return "https://cdn-icons-png.flaticon.com/512/44/44603.png";
    } else {
      return "https://cdn-icons-png.flaticon.com/512/44/44969.png";
    }
  };

  return (
    <div className="bodyCard">
      <div className="user">
        <img
          className="profile"
          src={
            "https://www.giantbomb.com/a/uploads/square_medium/46/462814/3222927-6826564307-latest.jpg"
          }
        ></img>
        <div className="title">
          <h3>
            {user.name} {user.lastname}
          </h3>
          <h4>Fecha: {time}</h4>
          <h4>Titulo: {title}</h4>
          <h4>Participantes: {participants}</h4>
        </div>
        <img className="arrow" src={ArrowOpen()} onClick={HandleOpen}></img>
      </div>

      {isOpen && (
        <div className="descriptionCard">
          <h4 className="description">{description}</h4>
          <div className="buttonCardEvent">
            <ButtonApp
              label={isActive ? "Salir" : "Participar"}
              method={HandleOpen}
              isCancel={isActive}
            />
          </div>
        </div>
      )}
    </div>
  );
};
