import { Divider } from '@mui/material'
import { ModuleCard } from '../../components/module/module'
import './home.css'
import { useEffect, useState } from 'react'
import { Module } from '../../domain/module'
import { moduleService } from '../../services/moduleService'
import { Title } from '../../components/title/title'



export const Home = () => {
    
    const [ modules , setModules ] = useState<Module[]>()

    const getModules = async () => {
        try{
            const res = await moduleService.getModules(1)
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