import { Outlet } from "react-router-dom";
import { Header } from "../header/header";
import { NavBar } from "../navbar/navbar";
import "./viewLayout.css";

export const ViewLayout = () => {
  return (
    <div className="app-container">
      <Header />
      <div className="layout-rendering-area">
        <Outlet />
      </div>
      <NavBar />
    </div>
  );
};