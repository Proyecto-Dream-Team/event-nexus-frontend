import { Header } from "../components/header/header"
import { NavBar } from "../components/navbar/navbar"
import './home.css'
export const Home = () => {

    return(
        <>
            <Header></Header>
                <h1>Modulos</h1>

                <main className="button-grid">
                    <div className="button-square"></div>
                    <div className="button-square"></div>
                    <div className="button-square"></div>
                    <div className="button-square"></div>
                </main>
            <NavBar></NavBar>
        </>
    )

}