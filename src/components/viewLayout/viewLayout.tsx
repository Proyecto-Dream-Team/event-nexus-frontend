import { Outlet } from "react-router-dom";
import { Header } from "../header/header";
import { NavBar } from "../navbar/navbar";
import "./viewLayout.css";

export const ViewLayout = () => {
    return <>
        <Header />
        <Outlet />
        {/* <NavBar /> */}
    </>
};