import { useEffect, useState } from "react";
import { useProfileImg } from "../../context/contextImg";
import { HeaderDto } from "../../domain/user";
import { serviceUser } from "../../services/serviceUser";
import "./header.css";
import WestIcon from '@mui/icons-material/West';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { getNotificationsByUserId } from "../../services/notification.service";
import { NotificationComponent } from "../notification/notification";
import { Button, Menu, MenuItem } from "@mui/material";


export const Header = () => {
	const id = Number(sessionStorage.getItem("userId"));
	const location = useLocation()
	const [data, setData] = useState<HeaderDto>(new HeaderDto(0, "", ""));
	const { img } = useProfileImg();
	const nav = useNavigate()
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};


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
		if (location.pathname.includes("module-directive-info")) return "Informacion Directiva";
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

			{/* <div>
				<Button
					id="basic-button"
					aria-controls={open ? 'basic-menu' : undefined}
					aria-haspopup="true"
					aria-expanded={open ? 'true' : undefined}
					onClick={handleClick}
				>
					Dashboard
				</Button>
				<Menu
					id="basic-menu"
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					slotProps={{
						list: {
							'aria-labelledby': 'basic-button',
						},
					}}
				>
					
					<MenuItem onClick={(e)=>(nav("/home"))}>Home</MenuItem>
					<MenuItem onClick={(e)=>(nav("/profile"))}>Mi perfil</MenuItem>
					<MenuItem onClick={(e)=>(nav("/login"))}>Logout</MenuItem>
				</Menu>
			</div> */}
			<NotificationComponent></NotificationComponent>
		</header>
	);
};