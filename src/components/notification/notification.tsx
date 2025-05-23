import { Modal, Box, Typography, Badge } from "@mui/material"
import { NotificationDTO } from "../../domain/notification"
import { useEffect, useState } from "react";
import { getNotificationsByUserId, trySSE } from "../../services/notification.service";
import { URL_SERVIDOR_REST } from "../../utils/config";
import './notification.css'


export const NotificationComponent = () => {
	const [open, setOpen] = useState(false);

	// ESTO HAY QUE ACOPLARLO A UNO SOLO, ES EL MISMO ESTADO. UN OBJECTO QUE MANEJE NUEVAS Y T0DAS
	const [notifications, setNotifications] = useState<NotificationDTO[]>([]);
	const [newNotifications, setNewNotifications] = useState<NotificationDTO[]>([]);
	const [unreadCount, setUnreadCount] = useState(0);
	const [onlyNew, setOnlyNew] = useState(true);
	const id = Number(sessionStorage.getItem("userId"));
	const [activeNotifications, setActiveNotifications] = useState(false);
	let eventSource: EventSource | null = null;

	const handleOpen = async () => {
		const notifications = await getNotificationsByUserId(id)
		setNotifications(notifications)
		setUnreadCount(0);
		setOpen(true)
	};

	const handleClose = () => {
		setOpen(false)
		setNewNotifications([])
	};

	function activateNotifications() {
		const button = document.querySelector('button.activable') as HTMLButtonElement;
		if(button.classList.contains('active')){
			setActiveNotifications(false);
			button.classList.remove('active')
			button.classList.add('inactive')
			trySSE(setUnreadCount, setNewNotifications, id, activeNotifications, eventSource)
		}else{
			setActiveNotifications(true);
			button.classList.remove('inactive')
			button.classList.add('active')
			trySSE(setUnreadCount, setNewNotifications, id, activeNotifications, eventSource)

		}
	}

	// function
	function handleActivate() {
		setOnlyNew(!onlyNew);
	}
	useEffect(() => {
		// trySSE(setUnreadCount)
		const fetchNotifications = async () => {
			const newNotifications = await getNotificationsByUserId(id);

			// if (!open) {
			// 	setUnreadCount(newNotifications.length);
			// }

			setNotifications(newNotifications);
		};
		fetchNotifications();
	}, [open]);


	const style = {
		position: 'absolute',
		display: 'flex',
		flexDirection: 'column',
		overflowY: 'scroll',
		gap: 2,
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		height: 300,
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		p: 4
	};

	const style2 = {
		width: 300,
		height: 100,
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		p: 4
	};

	return (
		<>
			<div className="header-right" onClick={handleOpen} style={{ position: 'relative', cursor: 'pointer' }}>
				<Badge
					badgeContent={unreadCount}
					color="error"
					overlap="circular"
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					sx={{
						'& .MuiBadge-badge': {
							fontSize: '1.2rem',
							height: 25,
							minWidth: 25,
							padding: '0 6px',
						},
					}}
				>
					<img
						src="/icons/notification.svg"
						alt="Notificación"
						className="notificationIcon"
						style={{ width: 40, height: 40 }}
					/>
				</Badge>
			</div>

			<Modal open={open} onClose={handleClose}>
				<Box sx={style}>
					<button onClick={activateNotifications} className="mock activable inactive">{activeNotifications ? "Desactivar" : "Activar"} notificaciones</button>
					<button onClick={handleClose} className="mock close">Cerrar</button>
					<button onClick={handleActivate} className="mock toggle">{onlyNew ? "Nuevas notificaciones" : "Todas"}</button>

					{onlyNew ? (
						// Display new notifications
						newNotifications.length === 0 ? (
							<Typography sx={{ mt: 2 }}>No tienes notificaciones nuevas.</Typography>
						) : (
							newNotifications.map((notification, index) => (<>
								<Box key={notification.id} sx={style2}>
									<Typography variant="h6">{notification.title}</Typography>
									<Typography sx={{ mt: 2 }}>{notification.date}</Typography>
								</Box>
							</>))
						)
					) : (
						// Display all notifications
						notifications.length === 0 ? (
							<Typography sx={{ mt: 2 }}>No tienes notificaciones.</Typography>
						) : (
							notifications.map((notification, index) => (<>
								<Box key={notification.id} sx={style2}>
									<Typography variant="h6">{notification.title}</Typography>
									<Typography sx={{ mt: 2 }}>{notification.date}</Typography>
								</Box>

							</>))
						)
					)}
				</Box>
			</Modal>
		</>
	);
}
