import { Badge, Box, Divider, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useToast } from "../../context/toast/useToast";
import { NotificationDTO } from "../../domain/notification";
import { getNotificationsByUserId, trySSE } from "../../services/notification.service";

import './notification.css';
import { max } from "@cloudinary/url-gen/actions/roundCorners";
import { brightness, opacity } from "@cloudinary/url-gen/actions/adjust";
import { border } from "@cloudinary/url-gen/qualifiers/background";
import { Padding } from "@mui/icons-material";

export const NotificationComponent = () => {
	const [openMenu, setOpenMenu] = useState(false);
	const { open } = useToast();
	const [notifications, setNotifications] = useState<NotificationDTO[]>([]);
	const [newNotifications, setNewNotifications] = useState<NotificationDTO[]>([]);
	const [unreadCount, setUnreadCount] = useState(0);
	const [onlyNew, setOnlyNew] = useState(false);
	const [activeNotifications, setActiveNotifications] = useState(false);
	const id = Number(sessionStorage.getItem("userId"));
	const eventSource: EventSource | null = null;
	const menuRef = useRef<HTMLDivElement>(null);

const handleOpen = async () => {
    if (openMenu) {
        handleClose();
        return;
    }
    setOpenMenu(true);
    const notifications = await getNotificationsByUserId(id);
    setNotifications(notifications);
    setUnreadCount(0);
};

const handleClose = () => {
    setOpenMenu(false);
    setNewNotifications([]);
};

	const formatIsoToDdMmAaaa = (isoString: string) => {
		const date = new Date(isoString);
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	};

	async function activateNotifications() {
		const button = document.querySelector('button.activable') as HTMLButtonElement;
		if (button.classList.contains('active')) {
			setActiveNotifications(false);
			await trySSE(setUnreadCount, setNewNotifications, id, activeNotifications, eventSource);
			button.classList.remove('active');
			button.classList.add('inactive');
			open("Notificaciones desactivadas", "info");
		} else {
			setActiveNotifications(true);
			button.classList.remove('inactive');
			button.classList.add('active');
			trySSE(setUnreadCount, setNewNotifications, id, activeNotifications, eventSource);
			open("Notificaciones activadas", "info");
		}
	}

	function handleActivate() {
		setOnlyNew(!onlyNew);
	}

	useEffect(() => {
		const fetchNotifications = async () => {
			const newNotifications = await getNotificationsByUserId(id);
			setNotifications(newNotifications);
		};
		fetchNotifications();
	}, [openMenu]);

	// 🔸 Cierre automático del menú si clickea fuera
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const bell = document.querySelector('.header-right');
			if (
				menuRef.current &&
				!menuRef.current.contains(event.target as Node) &&
				bell &&
				!bell.contains(event.target as Node)
			) {
				setOpenMenu(false);
			}
		};

		if (openMenu) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [openMenu]);
	const style = {
		display: 'flex',
		flexDirection: 'column',
		position: "absolute",
		overflowY: 'scroll',
		width: 250,
		height: '20rem',
		maxHeight: '70vh',
		top: '6rem',
		right: 0,
		bgcolor: '#5b6271',
		borderRadius: '0 0 0 1rem',
		float: "right",
		zIndex: 9999,
		padding: "1rem",
		boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2), -8px 0 16px 0 rgba(0,0,0,0.1), 8px 0 16px 0 rgba(0,0,0,0.1)',
	};

	const style2 = {
		display: "flex",
		flexDirection: "column",   
		gap: "0.5rem",             
		bgcolor: "#5b6271",
		color: "#ffffff",
		padding: "1rem",
	  };

	  const renderNotificationTitle = (title: string) => {
		const prefixes = [
			"Te invitaron al Evento",
			"Informacion Directiva Recibida"
		];
	
		const prefixFound = prefixes.find(prefix => title.startsWith(prefix));
		if (prefixFound) {
			const rest = title.slice(prefixFound.length).trim();
			return (
				<>
					<span style={{ fontWeight: "700" }}>{prefixFound}</span>
					<p style={{fontWeight: "100"}}>{rest}</p>
				</>
			);
		}
	
		return title;
	};

	return (
		<>
			<div className="header-right" onClick={handleOpen} style={{ position: 'absolute', right: '1rem', cursor: 'pointer' }}>
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
						style={{ width: 35, height: 35, cursor: 'pointer' }}
					/>
				</Badge>
			</div>

			{openMenu && (
				<div>
					<Box ref={menuRef} sx={style}>
						{/* <div className="butons">
							<button onClick={activateNotifications} className="notification activable inactive">
								{activeNotifications ? "Desactivar" : "Activar"} notificaciones
							</button>
							<button onClick={handleActivate} className="notification toggle">
								{onlyNew ? "Nuevas" : "Todas"}
							</button>
						</div> */}

						{onlyNew ? (
							newNotifications.length === 0 ? (
								<Typography sx={{ margin: '0 auto' }}>No tienes notificaciones nuevas.</Typography>
							) : (
								newNotifications.map((notification) => (
									<Box key={notification.id} sx={style2}>
										<Typography sx={{ mt: 2 }}>{formatIsoToDdMmAaaa(notification.date)}</Typography>
										<Typography sx={{ textAlign: "left" }} variant="h6">{notification.title}</Typography>
									</Box>
								))
							)
						) : (
							notifications.length === 0 ? (
								<Typography sx={{ mt: 2 }}>No tienes notificaciones.</Typography>
							) : (
								notifications.map((notification) => (
									<Box key={notification.id} sx={style2}>
										<Typography sx={{ textAlign: "left" }} variant="h6">
											{renderNotificationTitle(notification.title)}
										</Typography>
										<Typography sx={{ mt: 1 }}>{formatIsoToDdMmAaaa(notification.date)}</Typography>
										<Divider sx={{ }} />
									</Box>
								))
							)
						)}
					</Box>
				</div>
			)}
		</>
	);
};
