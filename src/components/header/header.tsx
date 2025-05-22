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
import { NotificationComponent } from "../notification/notification";


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

	const [open, setOpen] = useState(false);


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
			<NotificationComponent></NotificationComponent>

		</header>
	);
};