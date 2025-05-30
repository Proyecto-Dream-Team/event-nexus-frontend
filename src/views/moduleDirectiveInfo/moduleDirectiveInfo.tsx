import { Outlet } from "react-router-dom";
import { NavDirectiveInfo } from "./navDirectiveInfo/navDirectiveInfo";

export const ModuleDirectiveInfo = () => {



    return (
        <>
            <NavDirectiveInfo></NavDirectiveInfo>
            <Outlet></Outlet>
        </>
    );

}