import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./searchUss.css";

export const SearchUser = () => {
  const [value, setValue] = useState("");
  const [expanded, setExpanded] = useState(false);

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
        <SearchIcon className="search-icon" />
      </div>
    </section>
  );
};
