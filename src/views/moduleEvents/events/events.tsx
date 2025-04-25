import { useLocation } from "react-router-dom";
import { EventCard } from "../../../components/eventCard/event";
import { myEvent, event, EventDto } from "../../../domain/createEvent";
import { useEffect, useState } from "react";
import { moduleService } from "../../../services/moduleService";

export const Events = () => {
  const location = useLocation();
  const isVisible = location.pathname === "/module-events/all-events";
  const [events, setEvents] = useState<EventDto[]>();

  const getEvents = async () => {
    const data = await moduleService.getEvents();
    setEvents(data);
  };

  useEffect(() => {
    getEvents();
  }, []);

  return isVisible ? (
    <>
      {/* <EventCard info={event} />
      <EventCard info={event} />
      <EventCard info={event} /> */}
      {events?.map((item, index) => (
        <EventCard 
          key={index} 
          info={item as EventDto}>
        </EventCard>
      ))}
    </>
  ) : (
    <>
      <EventCard info={myEvent} />
      <EventCard info={myEvent} />
    </>
  );
};
