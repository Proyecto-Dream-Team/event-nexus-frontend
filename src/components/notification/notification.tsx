	import { Badge, Box, Divider, Typography } from "@mui/material";
	import { useEffect, useRef, useState } from "react";
	import { useToast } from "../../context/toast/useToast";
	import { NotificationDTO } from "../../domain/notification";
	import { getNotificationsByUserId, trySSE } from "../../services/notification.service";
	import "./notification.css";
	import { useLoader } from "../../context/loader/useLoader";
	import { URL_SERVIDOR_REST } from "../../utils/config";

	export const NotificationComponent = () => {
	const [openMenu, setOpenMenu] = useState(false);
	const { open } = useToast();
	const [notifications, setNotifications] = useState<NotificationDTO[]>([]);
	const [newNotifications, setNewNotifications] = useState<NotificationDTO[]>([]);
	const [unreadCount, setUnreadCount] = useState(0);
	const [onlyNew, setOnlyNew] = useState(false);
	const id = Number(sessionStorage.getItem("userId"));
	const menuRef = useRef<HTMLDivElement>(null);
	const { setIsLoading } = useLoader();
	const eventSourceRef = useRef<EventSource | null>(null);

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
		const day = String(date.getDate()).padStart(2, "0");
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	};

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
		const bell = document.querySelector(".header-right");
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

	useEffect(() => {
		setIsLoading(true);
		const newEventSource = new EventSource(
		`${URL_SERVIDOR_REST}/notification?employeeId=${id}`
		);
		eventSourceRef.current = newEventSource;
		trySSE(setUnreadCount, setNewNotifications, newEventSource, open);
		setIsLoading(false);
		return () => {
			if (eventSourceRef.current) {
				eventSourceRef.current.close();
				eventSourceRef.current = null; // Es importante limpiar la referencia
				console.log("Conexión SSE cerrada durante la limpieza del componente.");
			}
		};
	}, []);

	const style = {
		display: "flex",
		flexDirection: "column",
		position: "absolute" as const,
		overflowY: "scroll" as const,
		width: 250,
		height: "20rem",
		maxHeight: "70vh",
		top: "6rem",
		right: 0,
		bgcolor: "#5b6271",
		borderRadius: "0 0 0 1rem",
		float: "right" as const,
		zIndex: 9999,
		padding: "1rem",
		boxShadow:
		"0 8px 16px 0 rgba(0,0,0,0.2), -8px 0 16px 0 rgba(0,0,0,0.1), 8px 0 16px 0 rgba(0,0,0,0.1)",
	} as const;

	const style2 = {
		display: "flex",
		flexDirection: "column" as const,
		gap: "0.5rem",
		bgcolor: "#5b6271",
		color: "#ffffff",
		borderLeft: "3px solid #ffffff",
		paddingLeft: "1rem",
		margin: "1rem 0",
	} as const;

	const renderNotificationTitle = (title: string) => {
			const staticPrefixes = [
				"Te invitaron al Evento",
				"Informacion Directiva Recibida",
			];

		const staticPrefix = staticPrefixes.find((p) => title.startsWith(p));
		if (staticPrefix) {
			const rest = title.slice(staticPrefix.length).trim();
			return (
				<>
				<span style={{ fontWeight: 700 }}>{staticPrefix}</span>
				{rest && <span style={{ fontWeight: 300 }}> {rest}</span>}
				</>
			);
		}

		const joinRegex = /^(.+?) se unio al evento (.+)$/i;
		const leaveRegex = /^(.+?) abandono el evento (.+)$/i;

		const joinMatch = title.match(joinRegex);
		if (joinMatch) {
			const [, employee, eventTitle] = joinMatch;
			return (
				<>
				<span style={{ fontWeight: 700 }}>{employee}</span>
				<span> se unió al evento </span>
				<span style={{ fontWeight: 700 }}>{eventTitle}</span>
				</>
			);
		}

		const leaveMatch = title.match(leaveRegex);
		if (leaveMatch) {
			const [, employee, eventTitle] = leaveMatch;
			return (
				<>
				<span style={{ fontWeight: 700 }}>{employee}</span>
				<span> abandonó el evento </span>
				<span style={{ fontWeight: 700 }}>{eventTitle}</span>
				</>
			);
		}

		return title;
	};

	return (
		<>
		<div
			className="header-right"
			onClick={handleOpen}
			style={{ position: "absolute", right: "1rem", cursor: "pointer" }}
		>
			<Badge
				badgeContent={unreadCount}
				color="error"
				overlap="circular"
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				sx={{
					"& .MuiBadge-badge": {
					fontSize: "1.2rem",
					height: 25,
					minWidth: 25,
					padding: "0 6px",
					},
				}}
			>
			<img
				src="/icons/notification.svg"
				alt="Notificación"
				className="notificationIcon"
				style={{ width: 35, height: 35, cursor: "pointer" }}
			/>
			</Badge>
		</div>

		{openMenu && (
			<div>
				<Box ref={menuRef} sx={style}>
					{onlyNew ? (
					newNotifications.length === 0 ? (
						<Typography sx={{ margin: "0 auto" }}>
						No tienes notificaciones nuevas.
						</Typography>
					) : (
						newNotifications.map((notification) => (
						<Box key={notification.id} sx={style2}>
							<Typography sx={{ mt: 2 }}>
							{formatIsoToDdMmAaaa(notification.date)}
							</Typography>
							<Typography sx={{ textAlign: "left" }} variant="h6">
							{renderNotificationTitle(notification.title)}
							</Typography>
						</Box>
						))
					)
					) : notifications.length === 0 ? (
					<Typography sx={{ mt: 2 }}>No tienes notificaciones.</Typography>
					) : (
					notifications.map((notification) => (
						<Box key={notification.id}>
						<Box sx={style2}>
							<Typography sx={{ textAlign: "left" }} variant="h6">
							{renderNotificationTitle(notification.title)}
							</Typography>
							<Typography>
							{formatIsoToDdMmAaaa(notification.date)}
							</Typography>
						</Box>
						<Divider />
						</Box>
					))
					)}
				</Box>
			</div>
		)}
		</>
	);
	};
