
import { EventDto } from "../../domain/createEvent";
import "./event.css";
import { eventColorMapping } from "../../utils/typeEvent";
import { Button, Card, CardActions, CardContent, styled, Theme, Typography } from "@mui/material";
import { EventCategory } from "../../domain/eventTypes";

// interface EventProps {
//   event : EventDto;
//   method: (id : number) => void;
// }

export const EventCard = ({event}:{event: EventDto}) => {
	// const userId = Number(sessionStorage.getItem("userId"));
	// const navigate = useNavigate();
	// const [itIsIn, ChangeIn] = useState(isIn());
	// const backgroundUrl = EventType[event.type as keyof typeof EventType];
	// const backgroundColor = EventColor[event.type as keyof typeof EventColor];

	// function isIn() {
	// 	return event.creatorId === userId || event.participantsIds.includes(userId);
	// }

	// 3. Función para obtener el color de un evento
	function mapCardColorByEventType(eventType: EventCategory): string {
		return eventColorMapping[eventType];
	}

	function formatDate(dateToFormat: Date) {
		const splitedDate = dateToFormat.toString().split("T");
		const date = splitedDate[0];
		const time = splitedDate[1].split(":");
		const hour = time[0] + ":" + time[1];

		return date + " | " + hour;
	}
	return (
		<StyledCard sx={{ backgroundColor: mapCardColorByEventType(event.type) }}>
			{/* <CardMedia
				component="img"
				alt="green iguana"
				height="140"
				image="/static/images/cards/contemplative-reptile.jpg"
			/> */}
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{event.title}
				</Typography>
				<Typography variant="body2" sx={{ color: 'black' }}>
					{event.description}
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small">Share</Button>
				<Button size="small">Learn More</Button>
			</CardActions>
		</StyledCard>
		// <div className="bodyCard" >
		// 	<div
		// 		className="user"
		// 		style={{
		// 			background: `radial-gradient(circle, ${backgroundColor} 25%, rgb(63, 60, 60) 100%)`,
		// 		}}
		// 	>
		// 		<h3>{event.creatorName}</h3>
		// 		<img className="profile" src={event.creatorImage}></img>
		// 		<h3>{event.type}</h3>
		// 	</div>

		// 	<div
		// 		className="descriptionCardd"
		// 		style={{
		// 			backgroundImage: `url(${backgroundUrl})`,
		// 			backgroundSize: "cover", // Opcional, mejora visualmente
		// 			backgroundPosition: "center", // Opcional
		// 		}}
		// 	>

		// 		<div className="titleCardEvent">
		// 			<h4 className="titleEvent">{event.title}</h4>
		// 			<h4>{formatDate(event.dateFinished)}</h4>
		// 			<p>Participantes: {event.numberOfParticipants}</p>
		// 			<p>
		// 				{event.description}
		// 			</p>
		// 		</div>
		// 		<div className="buttonCardEvent">
		// 			{event.creatorId !== userId && (
		// 				itIsIn ? (
		// 					<ButtonCard label="Salir" method={joinleaveEvent} isCancel={true} />
		// 				) : (
		// 					<ButtonCard
		// 						label="Unirse"
		// 						method={joinleaveEvent}
		// 						isCancel={false}
		// 					/>
		// 				)
		// 			)}
		// 		</div>
		// 	</div>
		// </div>
	);
};

const StyledCard = styled(Card)(({ theme }:{ theme:Theme }) => ({
    // backgroundColor: theme.palette.secondary.main,
    height: '100%',
	// display: 'grid',
	// gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 20rem), 1fr))',
	// gridAutoRows: '10rem',
    // width: 'fit-content',
    // display: 'flex',
	// overflowY: 'scroll',
	// padding: theme.spacing(2),
	// gap: theme.spacing(1),
    // padding: 5,
    // gap: 5,
    // '& a, & h2': {
    //     height: 35,
    // },
    // borderColor: theme.palette.success.main,
    // borderWidth: '3px',
    // borderStyle: 'solid'
}));