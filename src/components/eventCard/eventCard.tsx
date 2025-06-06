import { EventDto } from "../../domain/createEvent";
import { eventColorMapping } from "../../utils/typeEvent";
import { Avatar, AvatarGroup, Box, Button, CardActions, CardContent, Divider,TextField, Tooltip, Typography } from "@mui/material";
import { EventCategory } from "../../domain/eventTypes";
import { useEffect, useState } from "react";
import { deleteEvent, moduleService } from "../../services/moduleService";
import { useToast } from "../../context/toast/useToast";
import { SimpleDialog } from "./eventParticipantsDialog";
import { StyledCard, StyledCardContent, StyledIconButton, StyleTypographyA } from "./eventCard.style";
import { calculateTimeLeft, formatDate } from "../../utils/functions";
import { mapEventTypeToIcon } from "./eventTypeIcon";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { PersonAdd } from "@mui/icons-material";

export const EventCard = ({ eventDTO }: { eventDTO: EventDto }) => {
	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(eventDTO.dateFinished.toString()));
	const [event, setEvent] = useState<EventDto>(eventDTO);
	const userId = Number(sessionStorage.getItem("userId"));
	const { open, } = useToast()
	const [openDialog, setOpenDialog] = useState(false);

	const handleDialog = () => {
		setOpenDialog(!openDialog);
	};

	function mapCardColorByEventType(eventType: EventCategory): string {
		return eventColorMapping[eventType];
	}

	async function joinleaveEvent() {
		try {
			const response = await moduleService.joinleaveEvent(event.id);
			setEvent((prevEvent) => ({
				...prevEvent,
				participants: response.responseBody,
			}));
			open(response.responseMessage, 'success')

		} catch (error: any) {
			open(error, "error");

		}
	}
	async function handleDelete() {
		try {
			const response = await deleteEvent(event.id);
			console.log(response)
			// setEvent((prevEvent) => ({
			// 	...prevEvent,
			// 	participants: response.responseBody,
			// }));
			open(response, 'success')

		} catch (error: any) {
			open(error, "error");

		}
	}
	
	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(calculateTimeLeft(eventDTO.dateFinished.toString()));
		}, 60 * 1000); // 60 segundos * 1000 ms = 1 minuto

		return () => clearInterval(timer);
	}, [eventDTO.dateFinished]);

	return (
		<StyledCard sx={{ border: `2px solid`, borderColor: mapCardColorByEventType(event.type) }} elevation={24}>
			<CardContent sx={{ height: "50%", padding: 1 }}>
				<Typography variant="h4" sx={{ color: 'black', fontWeight: 'bold' }}>
					{event.title}
				</Typography>

				<Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
					<StyleTypographyA sx={{ backgroundColor: mapCardColorByEventType(event.type) }}>
						{formatDate(event.dateFinished)}
					</StyleTypographyA>
					<StyleTypographyA sx={{ backgroundColor: mapCardColorByEventType(event.type) }}>
						Cuenta atras: {timeLeft.hours}:{timeLeft.minutes}
					</StyleTypographyA>
				</Box>
			</CardContent>

			<Divider />
			{/* <Divider sx={{borderColor: mapCardColorByEventType(event.type), borderWidth:"1px"}}/> */}

			<StyledCardContent>
				<TextField
					minRows={3}
					maxRows={3}
					multiline
					value={event.description}
					style={{ padding: 0, color: 'black' }}
					aria-disabled="true"
				/>

				<Box sx={{ display: 'flex', justifyContent: 'space-between', gridArea: 'participants', alignItems: 'center', padding: "0.5rem 0.5rem 0rem 0.5rem", }}>
					<Tooltip
						title={
							<h2 style={{ color: "black", fontSize: "12px" }}>
								Creador: {event.creatorName}
							</h2>
						}
						placement="top"
						arrow
					>
						<Box sx={{ display: 'flex', gap: 1, alignItems: 'center',  cursor: 'pointer'}}>
							<Avatar alt="" src={event.creatorImage} sx={{ width: 15, height: 15 }} />
							<Typography sx={{ color: 'black' }} variant="body2">
								{event.creatorName}
							</Typography>
						</Box>
					</Tooltip>



					{event.participants.length > 0 && (
						<Tooltip
							title={
								<h2 style={{ color: "black", fontSize: "12px" }}>
									PARTICIPANTES
								</h2>
							}
							placement="top"
							arrow
						>
							<AvatarGroup max={4} spacing="medium" onClick={handleDialog} sx={{ cursor: 'pointer' }}>
								{event.participants.map((participant, index) => (
									<Avatar key={index} alt={participant.name} src={participant.image} sx={{ width: 15, height: 15 }} />
								))}
							</AvatarGroup>
						</Tooltip>

					)}

					<SimpleDialog
						participants={eventDTO.participants}
						open={openDialog}
						onClose={handleDialog}
					/>

				</Box>
			</StyledCardContent>

			<Divider />
			{/* <Divider sx={{borderColor: mapCardColorByEventType(event.type), borderWidth:"1px"}}/> */}

			<CardActions sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: "0.5rem" }}>
				{event.creatorId == userId && (
					<Button size="medium" onClick={handleDelete}>Delete</Button>
				)}

				{event.creatorId != userId && (<>
					{event.participants.map((participant, index) => (participant.id)).includes(userId) ? (
						<StyledIconButton onClick={handleDelete}>
							<PersonRemoveIcon sx={{ color: "red" }} />
						</StyledIconButton>
					) : (
						<StyledIconButton onClick={joinleaveEvent}>
							<PersonAdd sx={{ color: "green" }} />
						</StyledIconButton>
					)}
				</>)}

				{mapEventTypeToIcon(event.type)}

			</CardActions>

		</StyledCard>

	);
};

