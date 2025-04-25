import { useLocation } from "react-router-dom";
import { EventCard } from "../../../components/eventCard/event";
import { EmployeeEvents, EventDto } from "../../../domain/createEvent";
import { useEffect, useState } from "react";
import { moduleService } from "../../../services/moduleService";

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

  return <>
    {showAllEvents ?
      events?.map((event, index) => (
        <EventCard
          key={index}
          event={event}>
        </EventCard>
      ))
      :
      <>
        <h3>Eventos creados</h3>
        {eventsEmployee?.createdEvents.map((event, index) => (
          <EventCard key={index} event={event}/>
        ))}
        <h3>Eventos que me invitaron</h3>
        {eventsEmployee?.invitedEvents.map((event, index) => (
          <EventCard key={index} event={event}/>
        ))}
      </>
    }

  </>

  // return isVisible ? (
  //   <>
  //     {/* <EventCard info={event} />
  //     <EventCard info={event} />
  //     <EventCard info={event} /> */}
  //     {events?.map((event, index) => (
  //       <EventCard 
  //         key={index} 
  //         event={event}>
  //       </EventCard>
  //     ))}
  //   </>
  // ) : (
  //   <>
  //     <EventCard info={myEvent} />
  //     <EventCard info={myEvent} />
  //   </>
  // );
};
