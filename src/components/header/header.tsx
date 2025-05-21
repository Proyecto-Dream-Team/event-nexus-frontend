import { useEffect, useState } from "react";
import { useProfileImg } from "../../context/contextImg";
import { HeaderDto } from "../../domain/user";
import { serviceUser } from "../../services/serviceUser";
import "./header.css";
import WestIcon from '@mui/icons-material/West';
import { NavLink, useLocation } from "react-router-dom";
import { getNotificationsByUserId, trySSE } from "../../services/notification.service";
import { NotificationDTO } from "../../domain/notification";
import { Box, Modal, Typography } from "@mui/material";
import { Height } from "@mui/icons-material";


const style = {
	position: 'absolute',
	display: 'flex',
	flexDirection: 'column',
	// scrollY: 'auto',
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

export const Header = () => {
	const id = Number(sessionStorage.getItem("userId"));
	const location = useLocation()
	const [data, setData] = useState<HeaderDto>(new HeaderDto(0, "", ""));
	const { img } = useProfileImg();
	const [notifications, setNotifications] = useState<NotificationDTO[]>([]);
	const [open, setOpen] = useState(false);
	const handleOpen = async () => {
		trySSE(setNotifications)
		const notifications = await getNotificationsByUserId(id)
		setNotifications(notifications)
		setOpen(true)
	};
	const handleClose = () => setOpen(false);

	useEffect(() => {
		const getData = async () => {
			try {
				const res = await serviceUser.getHeaderData(id);
				setData(res);
			} catch (error) {
				console.error("Error fetching header data:", error);
			}
		};

		getData();
	}, []);

	const getTitle = () => {
		if (location.pathname.includes("module-admin")) return "Administrador";
		if (location.pathname.includes("module-events")) return "Eventos";
		return "Eventos"; // HAY QUE MEJORAR ESTO PERO PARA MI (PICA). DEPENDE DE COMO MANEJAMOS LAS RUTAS
	};

	const isHome = () => {
		return location.pathname === '/home' || location.pathname === '/profile';
	}

	function getNotifications() {
		getNotificationsByUserId(id)
	}
	return (
		<header className="header">
			<div className="header-left">
				{isHome() ? (
					<div className="imgName">
						<img src={img} className="image" alt="Profile" />
						<p>{data.name} {data.lastname}</p>
					</div>
				) : (
					<NavLink to="home">
						<WestIcon className="imgName" sx={{ fontSize: "3rem", color: '#ffffff' }} />
					</NavLink>
				)}
			</div>

			<div className="header-center">
				{!isHome() && <h2 className="header-title">{getTitle()}</h2>}
			</div>

			<div className="header-right" onClick={handleOpen}>
				<img src="/icons/notification.svg" alt="Notificación" className="notificationIcon" />
			</div>

			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<button onClick={handleClose}>close</button>
					{notifications.length === 0 ? (<>
				
						<Typography id="modal-modal-title" variant="h6" component="h2">
						No tienes notificaciones
						</Typography>
						
					</>) : (
						notifications.map((notification) => (
							<div key={notification.id}>
								<Box sx={style2}>
									<Typography id="modal-modal-title" variant="h6" component="h2">
										{notification.title}
									</Typography>
									<Typography id="modal-modal-description" sx={{ mt: 2 }}>
										{notification.date}
									</Typography>
								</Box>
							</div>
						))
					)}	
					

				</Box>
			</Modal>
		</header>
	);
};