import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { EventCard } from "../../../components/eventCard/event";
import { useToast } from "../../../context/toast/useToast";
import { EmployeeEvents, EventDto } from "../../../domain/createEvent";
import { moduleService } from "../../../services/moduleService";
import "./events.css";
import { List, ListItemButton, ListItemText, Menu, MenuItem } from "@mui/material";

const options = [
  'sin filtro',
  'titulo',
  'categoria'
];
type FilterMode = "all" | "title" | "type"
export const Events = () => {
	const location = useLocation();

	const showAllEvents = location.pathname === "/module-events/all-events";
	const showMyEvents = location.pathname === "/module-events/my-events";
	const showCreatedEvents =
		location.pathname === "/module-events/created-events";
	const id = Number(sessionStorage.getItem("userId"));
	const [events, setEvents] = useState<EventDto[]>();
	const [eventsEmployee, setEventsEmployee] = useState<EmployeeEvents>();
	const [selectedIndex, setSelectedIndex] = useState(1);
	const { open, openHTTP } = useToast();
	const [filterMode, setFilterMode] = useState<FilterMode>("all")

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const openMenu = Boolean(anchorEl);

	const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleMenuItemClick = (
		event: React.MouseEvent<HTMLElement>,
		index: number
	) => {
		if(options[index] === "sin filtro") {
			setFilterMode("all");
		}
		if(options[index] === "titulo") {
			setFilterMode("title");
		}
		if(options[index] === "categoria") {
			setFilterMode("type");
		}
		setSelectedIndex(index);
		setAnchorEl(null);
	};

	async function searchEvents() {
		const filterValue: string = document.getElementById("filterValue")!.nodeValue!;
		console.log("filterValue", filterValue);
		const allEvents: EventDto[] = await moduleService.getEventsByTitle(filterValue);
		setEvents(allEvents);
	}

	async function eventsByCategory() {
		const filterValue: string = document.getElementById("filterValue")!.nodeValue!;
		console.log("filterValue", filterValue);
		const allEvents: EventDto[] = await moduleService.getEventsByTitle(filterValue);
		setEvents(allEvents);
	}
	const getEvents = async () => {
		if (showAllEvents) {
			if (filterMode == "all") {
				const allEvents: EventDto[] = await moduleService.getEvents();
				setEvents(allEvents);
			}
			if (filterMode == "title") {
				searchEvents();
			}
			if (filterMode == "type") {
				eventsByCategory();
			}

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
		try {
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
						{/* {FilterMode} */}
						{/* <div>FILTER</div> */}
						<div>
							<List
								component="nav"
								aria-label="Device settings"
								sx={{ bgcolor: 'background.paper' }}
							>
								<ListItemButton
									id="lock-button"
									aria-haspopup="listbox"
									aria-controls="lock-menu"
									aria-label="when device is locked"
									aria-expanded={openMenu ? 'true' : undefined}
									onClick={handleClickListItem}
								>
									<ListItemText
										primary="Filtrar eventos por:"
										secondary={options[selectedIndex]}
									/>
								</ListItemButton>
							</List>
							<Menu
								id="lock-menu"
								anchorEl={anchorEl}
								open={openMenu}
								onClose={handleClose}
							>
								{options.map((option, index) => (
									<MenuItem
										key={option}
										// disabled={index }
										selected={index === selectedIndex}
										onClick={(event) => handleMenuItemClick(event, index)}
									>
										{option}
									</MenuItem>
								))}
							</Menu>
						</div>
						{filterMode === "title" && 
							<input type="text" id="filterValue" />
						}

						{filterMode === "type" && 
							
							<input type="radio" id="filterValue" />
						}
						{/* ["Todos los eventos", "Filtrar por titulo", "Filtrar por categoria"].map((option, index)= */}
						
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
								<EventCard key={index} event={event} method={joinleaveEvent} />
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
									<EventCard key={index} event={event} method={joinleaveEvent} />
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
