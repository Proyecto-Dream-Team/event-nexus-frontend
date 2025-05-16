
import { useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./searchUss.css";
import { SesionStorage } from "../../../domain/user";
import { ProfileCard } from "../../../components/profileCard/profileCard";
import { serviceUser } from "../../../services/serviceUser";
 

export const SearchUser = () => {
  const [value, setValue] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [users, setUsers] = useState<SesionStorage[]>();
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchUSer = async () => {
    const response = await serviceUser.search(value);
    console.log(response);
    setUsers(response);
  };

  // Cerrar input si se clickea fuera
  useEffect(() => {
    const clickOut = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setExpanded(false);
      }
    };

    document.addEventListener("mousedown", clickOut);
    return () => {
      document.removeEventListener("mousedown", clickOut);
    };
  }, []);

  return (
    <section className="section">
      <div
        ref={containerRef}
        className={`search-container ${expanded ? "expanded" : ""}`}
        onClick={() => setExpanded(true)}
      >
        <input
          type="text"
          name="search"
          placeholder="Search..."
          className="search-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchUSer();
            }
          }}
        />
        <SearchIcon
		  className="search-icon"
          onClick={fetchUSer}
          style={{ fontSize: 36, background: "transparent", width: "auto" }}
        />
      </div>

      <div className="usuarios">
        {users?.map((item, index) => (
          <div
            key={index}
            style={{ animationDelay: `${index * 0.3}s` }}
            className="card-animated"
          >
            <ProfileCard user={item} />
          </div>
        ))}
      </div>
    </section>
  );
};
