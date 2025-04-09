import { Module } from '../../components/module/module'
import './home.css'
export const Home = () => {

    return(
        <>
            <h1>Modulos</h1>

            <main className="button-grid">
                <Module></Module>
                <Module></Module>
                <Module></Module>
                <Module></Module>
            </main>
        </>
    )

}