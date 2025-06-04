import { SetStateAction, useRef, useState } from "react";
import { EventCard } from "../../../components/eventCard/event";
import { useToast } from "../../../context/toast/useToast";
import { EventDto } from "../../../domain/createEvent";
import { moduleService } from "../../../services/moduleService";
import "./events.css";
import { EventFilter } from "../../../components/filters/eventFilter/eventFilter";
import { Grid, ListItem, styled, Theme } from "@mui/material";
import { StyledGrid } from "./event.style";

export const Events = () => {
	;
	const [events, setEvents] = useState<EventDto[]>();
	const { open } = useToast();


	return <>
		<EventFilter eventSetter={setEvents} />
		{/* <div className="containerEvents"> */}
		{/* <StyledGrid>
			{events?.length ? (
				events.map((event, index) => (
					<EventCard
						key={event.id || index}
						event={event}
					/>
				))
			) : (
				<h2>No hay eventos</h2>
			)}
		</StyledGrid> */}
		<StyledGrid container>
			{events?.length ? (
				events.map((event, index) => (
					<Grid key={index}>
						<EventCard
						key={event.id || index}
						event={event}
						/>
					</Grid>
					
				))
			) : (
				<h2>No hay eventos</h2>
			)}
		</StyledGrid>

	</>
};

