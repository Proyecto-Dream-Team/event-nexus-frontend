import { Outlet } from "react-router-dom";
import { Header } from "../header/header";

import "./viewLayout.css";
import { NavBar } from "../navbar/navbar";

export const ViewLayout = () => {
    return <>
        <Header />
        <Outlet />
        <NavBar />
    </>
};