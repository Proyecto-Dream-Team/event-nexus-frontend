import { useState } from "react";
import { EventDto } from "../../domain/createEvent";
import { ButtonApp } from "../buttons/button";
import "./event.css";

interface EventProps {
  info : EventDto;
}

export const EventCard = ({info}: EventProps) => {
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
    <div className={`bodyCard ${!info.isActive ? "active" : ""}`}>
      <div className="user">
        <img
          className="profile"
          src={
            "https://www.giantbomb.com/a/uploads/square_medium/46/462814/3222927-6826564307-latest.jpg"
          }
        ></img>
        <div className="title">
          <h3>
            {info.nombre} {info.apellido}
          </h3>
          <h4>Fecha: {info.fecha.toLocaleDateString()}</h4>
          <h4>Titulo: {info.title}</h4>
          <h4>Participantes: {info.participates}</h4>
        </div>
        <img className="arrow" src={ArrowOpen()} onClick={HandleOpen}></img>
      </div>

      {isOpen && (
        <div className="descriptionCard">
          <h4 className="description">{info.description}</h4>
          <div className="buttonCardEvent">
            <ButtonApp
              label={info.isActive ? "Salir" : "Participar"}
              method={HandleOpen}
              isCancel={info.isActive}
            />
          </div>
        </div>
      )}
    </div>
  );
};
