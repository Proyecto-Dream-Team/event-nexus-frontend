import { ModuleCard } from '../../components/module/module'
import './home.css'
import { useEffect, useState } from 'react'
import { Module } from '../../domain/module'
import { moduleService } from '../../services/moduleService'
import { Title } from '../../components/title/title'

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
            <main className="button-grid">
                {
                    modules?.map(( item , index ) =>(
                        <ModuleCard 
                            key = { index } 
                            value = { item as Module} >
                        </ModuleCard>
                    ))
                }
            </main>
        </>
    )

}