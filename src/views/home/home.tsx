import { useEffect, useState } from 'react'
import { ModuleCard } from '../../components/module/module'
import { Title } from '../../components/title/title'
import { Module } from '../../domain/module'
import { moduleService } from '../../services/moduleService'
import './home.css'

export const Home = () => {
    
    const [ modules , setModules ] = useState<Module[]>()
    const id = Number(sessionStorage.getItem("userId"));

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
            <main >
                <div className='module-card'>
                {
                    modules?.map(( item , index ) =>(
                        <ModuleCard 
                            key = { index } 
                            value = { item as Module} >
                        </ModuleCard>
                    ))
                }

                </div>
                <img className='image-home' src = "EventNexusImagotipo.png"/>
            </main>
        </>
    )

}