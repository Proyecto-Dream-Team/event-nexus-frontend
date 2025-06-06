import { Outlet } from "react-router-dom"
import { NavEvents } from "./navEvents/navEvents"

export const ModuleEvents = () => {
    return (
        <>
                {/* <NavEvents></NavEvents> */}
                <Outlet></Outlet>
        </>
    )
}