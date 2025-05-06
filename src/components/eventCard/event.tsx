import { useState } from "react";
import { EventDto } from "../../domain/createEvent";
import { ButtonApp } from "../buttons/button";
import "./event.css";
import { moduleService } from "../../services/moduleService";
import { useNavigate } from "react-router-dom";
import { ButtonCard } from "../buttons/buttonCard/buttonCard";

// interface EventProps {
//   info : EventDto;
// }

export const EventCard = ({ event }: { event: EventDto }) => {
  const userId = Number(sessionStorage.getItem("userId"));
  const navigate = useNavigate();
  const [isOpen, ChangeOpen] = useState(false);
  const [itIsIn, ChangeIn] = useState(isIn());

  function isIn() {
    return event.creatorId === userId || event.participantsIds.includes(userId);
  }

  const HandleOpen = () => {
    ChangeOpen(!isOpen);
  };

  const handleReload = () => {
    ChangeIn(!itIsIn);
    navigate("/module-events/all-events");
  };

  async function joinleaveEvent() {
    await moduleService.joinleaveEvent(event.id);
    HandleOpen();
    handleReload();
  }

  const ArrowOpen = () => {
    if (isOpen) {
      return "https://cdn-icons-png.flaticon.com/512/44/44603.png";
    } else {
      return "https://cdn-icons-png.flaticon.com/512/44/44969.png";
    }
  };

  function formatDate(dateToFormat: Date) {
    const splitedDate = dateToFormat.toString().split("T");
    const date = splitedDate[0];
    const time = splitedDate[1].split(":");
    const hour = time[0] + ":" + time[1];

    return date + " | " + hour;
  }
  return (
    <div className= "bodyCard" >
      <div className={`user ${!itIsIn ? "active" : "notActive"}`}>
        <h3>{event.creatorName}</h3>
        <img className="profile" src={event.creatorImage}></img>
      </div>

      <div className="descriptionCard">
        <div className="title">
          <h4 className="titleEvent">{event.title}</h4>
          <h4>{formatDate(event.dateFinished)}</h4>
          <h4>Participantes: {event.numberOfParticipants}</h4>
          <h4>
            nos juntaremos con el equipo a realizaar mastesr class de jowt
          </h4>
        </div>
        <div className="buttonCardEvent">
          {itIsIn ? (
            <ButtonCard label="Salir" method={joinleaveEvent} isCancel={true} />
          ) : (
            <ButtonCard
              label="Unirse"
              method={joinleaveEvent}
              isCancel={false}
            />
          )}
        </div>
      </div>
    </div>
  );
};
