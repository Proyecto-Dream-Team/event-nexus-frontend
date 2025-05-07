import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EventDto } from "../../domain/createEvent";
import { ButtonCard } from "../buttons/buttonCard/buttonCard";
import "./event.css";

interface EventProps {
  event : EventDto;
  method: (id : number) => void;
}

export const EventCard = ({ event, method }: EventProps) => {
  const userId = Number(sessionStorage.getItem("userId"));
  const navigate = useNavigate();
  const [itIsIn, ChangeIn] = useState(isIn());

  function isIn() {
    return event.creatorId === userId || event.participantsIds.includes(userId);
  }

  async function joinleaveEvent() {
    method(event.id);
    // ChangeIn(!itIsIn);
  }


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
          <p>Participantes: {event.numberOfParticipants}</p>
          <p>
            {event.description}
          </p>
        </div>
        <div className="buttonCardEvent">
         {event.creatorId !== userId && (
          itIsIn ? (
            <ButtonCard label="Salir" method={joinleaveEvent} isCancel={true} />
          ) : (
            <ButtonCard
              label="Unirse"
              method={joinleaveEvent}
              isCancel={false}
            />
          )
         )}
        </div>
      </div>
    </div>
  );
};
