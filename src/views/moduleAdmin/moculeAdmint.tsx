import { Outlet } from "react-router-dom"
import { NavAdmin } from "./navAdmin/navAdmin"

export const ModuleAdmin = () => {
    return (
       
       <>
            <NavAdmin></NavAdmin>
            <Outlet></Outlet>
       </>
    )
}