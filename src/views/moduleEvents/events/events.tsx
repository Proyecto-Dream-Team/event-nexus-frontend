import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { EventCard } from "../../../components/eventCard/event";
import { useToast } from "../../../context/toast/useToast";
import { EmployeeEvents, EventDto } from "../../../domain/createEvent";
import { moduleService } from "../../../services/moduleService";
import "./events.css";
import { serviceUser } from "../../../services/serviceUser";

export const Events = () => {
	const location = useLocation();

	const showAllEvents = location.pathname === "/module-events/all-events";
	const showMyEvents = location.pathname === "/module-events/my-events";
	const showCreatedEvents =
		location.pathname === "/module-events/created-events";
	const id = Number(sessionStorage.getItem("userId"));
	const [events, setEvents] = useState<EventDto[]>();
	const [eventsEmployee, setEventsEmployee] = useState<EmployeeEvents>();
	const {open, openHTTP} = useToast();

	const getEvents = async () => {
		if (showAllEvents) {
			const allEvents: EventDto[] = await moduleService.getEvents();
			setEvents(allEvents);
		}
		if (showMyEvents) {
			const id = Number(sessionStorage.getItem("userId"));
			const employeeEvents: EmployeeEvents = await moduleService.employeeEvents(
				id
			);
			setEventsEmployee(employeeEvents);
		}
		if (showCreatedEvents) {
			const id = Number(sessionStorage.getItem("userId"));
			const employeeEvents: EmployeeEvents = await moduleService.employeeEvents(
				id
		);
			setEventsEmployee(employeeEvents);
		}
	};

	const joinleaveEvent = async (eventId: number) => {
	try{
		const res = await moduleService.joinleaveEvent(eventId);
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

	useEffect(() => {
		getEvents();
	}, [showAllEvents]);
  

  return (
    <div className="containerEvents">
      <>
        {showAllEvents && (
            <>
            {events?.filter(
              (event) =>
              event.creatorId !== id &&
              !event?.participantsIds?.includes(id)
            )?.length ? (
              events
              .filter(
                (event) =>
                event.creatorId !== id &&
                !event?.participantsIds?.includes(id)
              )
              .map((event, index) => (
                <EventCard
                key={event.id || index}
                event={event as EventDto}
                method={joinleaveEvent}
                />
              ))
            ) : (
              <h2>No hay eventos</h2>
            )}
            </>
        )}
        {showCreatedEvents && (
          <>
            {eventsEmployee?.createdEvents.length ? (
              eventsEmployee?.createdEvents.map((event, index) => (
                <EventCard key={index} event={event} method={joinleaveEvent}/>
              ))
            ) : (
              <h2>No hay eventos</h2>
            )}
          </>
        )}
        {showMyEvents && (
          <>
            {eventsEmployee?.invitedEvents.filter(
              (event) => event.creatorId != id
            ).length ? (
              eventsEmployee?.invitedEvents
                .filter((event) => event.creatorId != id)
                .map((event, index) => (
                  <EventCard key={index} event={event} method={joinleaveEvent}/>
                ))
            ) : (
              <h2>No hay eventos</h2>
            )}
          </>
        )}
      </>
    </div>
  );
};
