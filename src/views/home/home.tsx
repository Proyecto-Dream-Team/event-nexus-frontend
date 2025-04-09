import { Divider } from '@mui/material'
import { Module } from '../../components/module/module'
import './home.css'

const dividerStyles = {
    backgroundColor: '#ffffff',
    height: '2px',
    margin: '2rem 4rem',
  }

export const Home = () => {

    return(
        <>
            <h1>Modulos</h1>
            <Divider style={dividerStyles} />
            <main className="button-grid">
                <Module></Module>
                <Module></Module>
                <Module></Module>
                <Module></Module>
            </main>
        </>
    )

}