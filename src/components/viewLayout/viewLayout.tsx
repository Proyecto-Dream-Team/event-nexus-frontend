import { Outlet } from "react-router-dom";
import { Header } from "../header/header";

import "./viewLayout.css";

export const ViewLayout = () => {
    return <>
        <Header />
        <Outlet />
        {/* <NavBar /> */}
    </>
};