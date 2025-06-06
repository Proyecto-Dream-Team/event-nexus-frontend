import { SetStateAction, useEffect, useRef, useState } from "react";
import { EventCard } from "../../../components/eventCard/eventCard";
import { useToast } from "../../../context/toast/useToast";
import { EmployeeEvents, EventDto } from "../../../domain/createEvent";
import { moduleService } from "../../../services/moduleService";
import "./relatedEvents.css";
import { EventFilter } from "../events/eventFilter";

type mode = "createdEvents" | "invitedEvents"
export const RelatedEvents = () => {
    ;
    const [events, setEvents] = useState<EventDto[]>();
    const [eventsEmployee, setEventsEmployee] = useState<EmployeeEvents>();
    const [mode, setMode] = useState<mode>("invitedEvents");
    const { open } = useToast();
    const userId = Number(sessionStorage.getItem('userId'));

    async function getEmployeeEvents() {
        const events: EmployeeEvents = await moduleService.employeeEvents(userId);
        setEventsEmployee(events);
    }
    useEffect(() => {
        getEmployeeEvents();
    }, [mode])
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
            <button onClick={(e) => setMode("invitedEvents")}>Participo</button>
            <button onClick={(e) => setMode("createdEvents")}>Creados</button>
            {mode == "createdEvents" && eventsEmployee?.createdEvents?.length != 0 ? (
                eventsEmployee?.createdEvents?.map((event, index) => (
                    <EventCard
                        key={event.id || index}
                        event={event as EventDto}
                        method={joinleaveEvent}
                    />
                ))
            ) : (
                <h2>No creaste ningun evento!</h2>
            )}
            {mode == "invitedEvents" && eventsEmployee?.invitedEvents?.length != 0 ? (
                eventsEmployee?.invitedEvents?.map((event, index) => (
                    <EventCard
                        key={event.id || index}
                        event={event as EventDto}
                        method={joinleaveEvent}
                    />
                ))
            ) : (
                <h2>No participas de ningun evento!</h2>
            )}
        </div>
    );
};
