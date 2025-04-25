import { useState } from "react";
import { EventDto } from "../../domain/createEvent";
import { ButtonApp } from "../buttons/button";
import "./event.css";
import { moduleService } from "../../services/moduleService";

// interface EventProps {
//   info : EventDto;
// }

export const EventCard = ({event}:{event:EventDto}) => {
  const [isOpen, ChangeOpen] = useState(false);

  const HandleOpen = () => {
    ChangeOpen(!isOpen);
  };

  function joinEvent(){
    moduleService.joinEvent(event.id)
  }
  function leaveEvent(){
    moduleService.leaveEvent(event.id)
  }

  const ArrowOpen = () => {
    if (isOpen) {
      return "https://cdn-icons-png.flaticon.com/512/44/44603.png";
    } else {
      return "https://cdn-icons-png.flaticon.com/512/44/44969.png";
    }
  };

  function formatDate(dateToFormat:Date){
    const splitedDate = dateToFormat.toString().split('T')
    const date = splitedDate[0]
    const time = splitedDate[1].split(':')
    const hour = time[0]+':'+time[1]

    return date + ' | ' + hour
  }
  return (
    <div className={`bodyCard ${!event.isActive ? "active" : ""}`}>
      <div className="user">
        <img
          className="profile"
          src={
            "https://www.giantbomb.com/a/uploads/square_medium/46/462814/3222927-6826564307-latest.jpg"
          }
        ></img>
        <div className="title">
          <h3>{event.creatorName}</h3>
          <h4>Fecha: {formatDate(event.dateFinished)}</h4>
          <h4>Titulo: {event.title}</h4>
          <h4>Participantes: {event.numberOfParticipants}</h4>
        </div>
        <img className="arrow" src={ArrowOpen()} onClick={HandleOpen}></img>
      </div>

      {isOpen && (
        <div className="descriptionCard">
          <h4 className="description">{event.description}</h4>
          <div className="buttonCardEvent">
            {/* <ButtonApp
              label={!event.isActive ? "Salir" : "Participar"}
              method={HandleOpen}
              isCancel={!event.isActive}
            /> */}
            <button onClick={joinEvent}>Participar</button>
            <button onClick={leaveEvent}>Abandonar</button>
          </div>
        </div>
      )}
    </div>
  );
};
