import { useEffect, useState } from 'react'
import { ModuleCard } from '../../components/module/module'
import { Title } from '../../components/title/title'
import { Module } from '../../domain/module'
import { moduleService } from '../../services/moduleService'
import './home.css'

export const Home = () => {
    
    const [ modules , setModules ] = useState<Module[]>()
    const id = Number(sessionStorage.getItem("userId"));


    const modulo1 = new Module( 0 , "Events" , "congrats.svg")
    const modulo2 = new Module( 1 , "Directivas" , "preguntasFrecuentes.png")
    const modulo3 = new Module( 2 , "Reservar Espacio" , "reservarEspacio.png")
    const modulo4 = new Module( 3 , "pepe" , "reservarEspacio.png")


    const modulos = [ modulo1 , modulo2 , modulo3 , modulo4 ]

    const getModules = async () => {
        try{
            const res = await moduleService.getModules(id)
            setModules(res) 
        } catch (e : unknown) {
            console.log(e)
        }
    }
    
    useEffect(() => {
        getModules()
    },[])

    return(
        <>
            <Title title='Modulos'></Title>
            <main className='main' >
                <div className='module-card'>
                {
                    modulos?.map((item, index) => (
                        <div
                        key={index}
                        style={{ animationDelay: `${index * 0.3}s` }}
                        className="card-animated"
                        >
                        <ModuleCard value={item} />
                        </div>
                    ))
                }               
                </div>
                <img className='image-home' src = "EventNexusImagotipo.png"/>
            </main>
        </>
    )

}