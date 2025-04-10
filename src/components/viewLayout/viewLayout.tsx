import { Outlet } from "react-router-dom"
import { Header } from "../header/header"
import { NavBar } from "../navbar/navbar"

export const ViewLayout = () =>{
    return(<>
        <Header></Header>
            <Outlet></Outlet>
        <NavBar></NavBar>
    </>)
}