import React, { useState } from "react";
import "./searchUss.css";


export const SearchUser = () => {
  const [value, setValue] = useState("");

  return (
    <section className="section">
      <div className="search__container">
        <input
          className="search__input"
          type="text"
          placeholder="Search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </section>
  );
};

