import { useState } from "react";
import { EventCard } from "../../../components/eventCard/eventCard";
import { EventDto } from "../../../domain/createEvent";
import { EventFilter } from "./eventFilter";
import { Grid } from "@mui/material";
import { StyledGrid } from "./event.style";

export const Events = () => {
	const [events, setEvents] = useState<EventDto[]>();


	return <>
		<EventFilter eventSetter={setEvents} />
		<StyledGrid container>
			{events?.length ? (
				events.map((event, index) => (
					<Grid key={index}>
						<EventCard
						key={event.id || index}
						eventDTO={event}
						/>
					</Grid>
					
				))
			) : (
				<h2>No hay eventos</h2>
			)}
		</StyledGrid>

	</>
};

