import { useState } from "react";
import { EventCard } from "../../../components/eventCard/eventCard";
import { EventDto } from "../../../domain/createEvent";
import { EventFilter } from "./eventFilter";
import { Fab, Grid } from "@mui/material";
import { StyledGrid } from "./event.style";
import AddIcon from '@mui/icons-material/Add';
import { StyledFloatingButton } from "./eventFilter.style";
import { useNavigate } from "react-router-dom";

export const Events = () => {
	const [events, setEvents] = useState<EventDto[]>();
	const nav = useNavigate()

	return <>
		<EventFilter eventSetter={setEvents} />
		<StyledFloatingButton color="primary" aria-label="add" onClick={(e) => (nav('/module-events/create-event'))}>
			<AddIcon />
		</StyledFloatingButton>
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

