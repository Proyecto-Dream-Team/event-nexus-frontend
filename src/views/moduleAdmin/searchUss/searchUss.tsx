
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./searchUss.css";
import { SesionStorage } from "../../../domain/user";
import { ProfileCard } from "../../../components/profileCard/profileCard";
import { serviceUser } from "../../../services/serviceUser";


export const SearchUser = () => {
  const [value, setValue] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [users , setUsers] = useState<SesionStorage[]>()


  const fetchUSer = async () => {
    const response = await serviceUser.search(value);
    console.log(response)
    setUsers(response);
};

  return (
    <section className="section">
      	<div
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
			/>
        	<SearchIcon className="search-icon" onClick={fetchUSer}/>
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
