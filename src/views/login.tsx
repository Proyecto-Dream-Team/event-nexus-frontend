import {useLocation} from 'react-router-dom'


export const Login = () => {

const location = useLocation()


    return(
        <h1>{location.pathname == "/register" ? "Registro" : "Iniciar sesión"}</h1>
    )

}