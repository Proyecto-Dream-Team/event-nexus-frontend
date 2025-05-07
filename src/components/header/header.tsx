import { useEffect, useState } from "react";
import { useProfileImg } from "../../context/contextImg";
import { HeaderDto } from "../../domain/user";
import { serviceUser } from "../../services/serviceUser";
import "./header.css";
import WestIcon from '@mui/icons-material/West';
import { NavLink, useLocation} from "react-router-dom";

export const Header = () => {
  const id = Number(sessionStorage.getItem("userId"));
  const location = useLocation()
  const [ data , setData ] = useState<HeaderDto>(new HeaderDto(0, "", ""));
  const {img} = useProfileImg(); 

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
  
  const isHome = () => {
    return location.pathname === '/home' || location.pathname === '/profile';
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
              {!isHome() && <h2 >Eventos</h2>}
            </div>

            <div className="header-right">
              <img src="./icons/notification.svg" alt="Notificación" className="notificationIcon" />
            </div>
          </header>
  );
};