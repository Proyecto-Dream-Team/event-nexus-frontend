import { useLocation } from "react-router-dom";
import { EventCard } from "../../../components/eventCard/event";
import { myEvent, event } from "../../../domain/createEvent";

export const Events = () => {
  const location = useLocation();
  const isVisible = location.pathname === "/module-events/all-events";

  return isVisible ? (
    <>
      <EventCard info={event} />
      <EventCard info={event} />
      <EventCard info={event} />
    </>
  ) : (
    <>
      <EventCard info={myEvent} />
      <EventCard info={myEvent} />
    </>
  );
};
