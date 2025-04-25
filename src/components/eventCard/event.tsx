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
  const userId = Number(sessionStorage.getItem("userId"));

  const isCreator = event.creatorId === userId || event.participantsIds.includes(userId);

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
          src={event.creatorImage}
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
            {isCreator ? (
              <ButtonApp
                label="Salir"
                method={leaveEvent}
                isCancel={true}
              />
            ) : (
              <ButtonApp
                label="Unirse"
                method={joinEvent}
                isCancel={false}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
