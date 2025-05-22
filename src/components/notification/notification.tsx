import { Modal, Box, Typography, Badge } from "@mui/material"
import { NotificationDTO } from "../../domain/notification"
import { useEffect, useState } from "react";
import { getNotificationsByUserId, trySSE } from "../../services/notification.service";

export const NotificationComponent = () => {
	const [open, setOpen] = useState(false);
	const [notifications, setNotifications] = useState<NotificationDTO[]>([]);
	const [unreadCount, setUnreadCount] = useState(0);

	const id = Number(sessionStorage.getItem("userId"));

	const handleOpen = async () => {
		const notifications = await getNotificationsByUserId(id)
		setNotifications(notifications)
		setUnreadCount(0); 
		setOpen(true)
	};

	const handleClose = () => setOpen(false);

useEffect(() => {
	const fetchNotifications = async () => {
		const newNotifications = await getNotificationsByUserId(id);

		if (!open) {
			setUnreadCount(newNotifications.length);
		}

		setNotifications(newNotifications);
	};

	fetchNotifications();
	const interval = setInterval(fetchNotifications, 5000); // cada 5 segundos

	return () => clearInterval(interval);
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
					<button onClick={handleClose}>Cerrar</button>
					{notifications.length === 0 ? (
						<Typography>No tienes notificaciones</Typography>
					) : (
						notifications.map((notification) => (
							<Box key={notification.id} sx={style2}>
								<Typography variant="h6">{notification.title}</Typography>
								<Typography sx={{ mt: 2 }}>{notification.date}</Typography>
							</Box>
						))
					)}
				</Box>
			</Modal>
		</>
	);
}
