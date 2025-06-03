import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EventDto } from "../../domain/createEvent";
import { ButtonCard } from "../buttons/buttonCard/buttonCard";
import "./event.css";
import { EventColor, EventType } from "../../utils/typeEvent";

interface EventProps {
  event : EventDto;
  method: (id : number) => void;
}

export const EventCard = ({ event, method }: EventProps) => {
	const userId = Number(sessionStorage.getItem("userId"));
	const navigate = useNavigate();
	const [itIsIn, ChangeIn] = useState(isIn());
	const backgroundUrl = EventType[event.type as keyof typeof EventType];
	const backgroundColor = EventColor[event.type as keyof typeof EventColor];

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
		<div
			className="user"
			style={{
			background: `radial-gradient(circle, ${backgroundColor} 25%, rgb(63, 60, 60) 100%)`,
			}}
		>
			<h3>{event.creatorName}</h3>
			<img className="profile" src={event.creatorImage}></img>
			<h3>{event.type}</h3>
		</div>

		<div
			className="descriptionCardd"
			style={{
				backgroundImage: `url(${backgroundUrl})`,
				backgroundSize: "cover", // Opcional, mejora visualmente
				backgroundPosition: "center", // Opcional
			}}
			>

			<div className="titleCardEvent">
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
