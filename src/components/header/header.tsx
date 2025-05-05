import { useEffect, useState } from "react";
import { useProfileImg } from "../../context/contextImg";
import { HeaderDto } from "../../domain/user";
import { serviceUser } from "../../services/serviceUser";
import "./header.css";


export const Header = () => {
  const id = Number(sessionStorage.getItem("userId"));
  // const role = sessionStorage.getItem("userRole")?.toString(); DE MOMENTO NO SE USA
  const [data, setData] = useState<HeaderDto>(new HeaderDto(0, "", ""));
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

  return (
    <>
      <header className="header">
        <div className="imgName">
          <img src={img} className="image" alt="Profile"></img>
          <div className="data-profile">
            <p>{data.name} {data.lastname} </p> 
          </div>
        </div>
        <img  src="./icons/notification.svg" alt="" />
      </header>
    </>
  );
};
