import { useEffect, useState } from 'react'
import { ModuleCard } from '../../components/module/module'
import { Title } from '../../components/title/title'
import { Module } from '../../domain/module'
import { moduleService } from '../../services/moduleService'
import './home.css'

export const Home = () => {
    
    const [ modules , setModules ] = useState<Module[]>()
    const id = Number(sessionStorage.getItem("userId"));


    const modulo1 = new Module( 0 , "Events" ,"Lorem ipsum dolor sit amet consectetur adipisicing elit.", "events.svg")
    const modulo2 = new Module( 1 , "Directivas" ,"Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi officia porro numquam blanditiis itaque.", "information.svg")
    const modulo3 = new Module( 2 , "Reservar Espacio", "Lorem ipsum dolor sit amet consectetur adipisicing elit." , "reservarEspacio.png")
    const modulo4 = new Module( 3 , "pepe" ,"Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi officia porro numquam blanditiis itaque.", "reservarEspacio.png")


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
                    modules?.map((item, index) => (
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