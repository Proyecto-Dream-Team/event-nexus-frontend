import { useEffect, useState } from "react";
import "./header.css";
import { serviceUser } from "../../services/serviceUser";
import { HeaderDto } from "../../domain/user";

export const Header = () => {
  const id = Number(sessionStorage.getItem("userId"));
  const role = sessionStorage.getItem("userRole")?.toString();
  const [data, setData] = useState<HeaderDto>(new HeaderDto(0, "", ""));
  const img = sessionStorage.getItem("img")?.toString();

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
          <img src={img} className="image"></img>
          <div className="data-profile">
            <p>{data.name}</p>
            <p> {data.lastname} </p>
          </div>
        </div>
        <p className="cargo">{role}</p>
      </header>
    </>
  );
};
