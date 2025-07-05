import { useEffect, useState } from "react";
import { EventCard } from "../../../components/eventCard/eventCard";
import { EventDto } from "../../../domain/createEvent";
import { EventFilter } from "./eventFilter";
import { StyledGrid } from "./event.style";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../../../context/loader/useLoader";


import './events.css'

export const Events = () => {
	const [events, setEvents] = useState<EventDto[]>();
	const nav = useNavigate()
	 const { setIsLoading } = useLoader()

	useEffect(() => {
        setIsLoading(true);
    }, []);

	return <>
		<div className="container__events">
			<EventFilter eventSetter={setEvents} setIsLoading={setIsLoading}/>
			<button className="button_floating" onClick={(e) => (nav('/module-events/create-event'))}>+</button>
			<StyledGrid container>
				{events?.length ? (
					events.map((event, index) => (
						<div
							key={index}
							style={{ animationDelay: `${index * 0.1}s` }}
							className="card-animated"
						>
							<EventCard
								key={event.id}
								eventDTO={event}
							/>
						</div>
					))
				) : (
					<></>
				)}
			</StyledGrid>
		</div>

	</>
};

