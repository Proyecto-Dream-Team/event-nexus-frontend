import { useLocation } from "react-router-dom";
import { EventCard } from "../../../components/eventCard/event";
import { EmployeeEvents, EventDto } from "../../../domain/createEvent";
import { useEffect, useState } from "react";
import { moduleService } from "../../../services/moduleService";
import { Title } from "../../../components/title/title";

export const Events = () => {
  const location = useLocation();
  const isVisible = location.pathname === "/module-events/all-events";

  const showAllEvents = location.pathname === "/module-events/all-events";
  const showMyEvents = location.pathname === "/module-events/my-events";
  const [events, setEvents] = useState<EventDto[]>();
  const [eventsEmployee, setEventsEmployee] = useState<EmployeeEvents>();

  const getEvents = async () => {
    if (showAllEvents) {
      const allEvents: EventDto[] = await moduleService.getEvents()
      setEvents(allEvents);
    }
    if (showMyEvents) {
      const id = Number(sessionStorage.getItem("userId"));
      const employeeEvents: EmployeeEvents = await moduleService.employeeEvents(id)
      setEventsEmployee(employeeEvents);
    }

  };

  useEffect(() => {
    getEvents();
  }, [showAllEvents]);

  return (
    <>
      {showAllEvents ? (
        <>
          <Title title={"Todos los eventos"} />
          {events?.map((event, index) => (
            <EventCard
              key={event.id || index}
              event={event as EventDto}
            />
          ))}
        </>
      ) : (
        <>
          <Title title={"Eventos creados"} ></Title>
          {eventsEmployee?.createdEvents.map((event, index) => (
            <EventCard key={index} event={event}/>
          ))}

          <Title title={"Invitaciones"} ></Title>
          {eventsEmployee?.invitedEvents.map((event, index) => (
            <EventCard key={index} event={event}/>
          ))}
        </>
      )}
    </>
  );
};
