import { SetStateAction, useRef, useState } from "react";
import { EventCard } from "../../../components/eventCard/event";
import { useToast } from "../../../context/toast/useToast";
import { EmployeeEvents, EventDto } from "../../../domain/createEvent";
import { moduleService } from "../../../services/moduleService";
import "./events.css";
import { EventFilter } from "../../../components/filters/eventFilter/eventFilter";

// type mode = "createdEvents" | "invitedEvents"
export const Events = () => {;
	const [events, setEvents] = useState<EventDto[]>();
	const [eventsEmployee, setEventsEmployee] = useState<EmployeeEvents>();
	const { open } = useToast();

	const joinleaveEvent = async (eventId: number) => {
		try {
			await moduleService.joinleaveEvent(eventId);
			setEventsEmployee((prevState) => {
				if (prevState) {
					return {
						...prevState,
						invitedEvents: prevState.invitedEvents.filter(
							(event) => event.id !== eventId
						),
					};
				}
				return prevState;
			});

			setEvents((prevState) => {
				if (prevState) {
					return prevState.filter((event) => event.id !== eventId);
				}
				return prevState;
			});
			open("Lista actualizada", "success");
		}
		catch (error) {
			open("Error al unirse o abandonar el evento", "error");
		}
	}

	return (
		<div className="containerEvents">
			<EventFilter eventSetter={setEvents}/>
			{events?.length ? (
				events.map((event, index) => (
					<EventCard
						key={event.id || index}
						event={event as EventDto}
						method={joinleaveEvent}
					/>
				))
			) : (
				<h2>No hay eventos</h2>
			)}

		</div>
	);
};
