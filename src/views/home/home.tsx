import { Divider } from '@mui/material'
import { ModuleCard } from '../../components/module/module'
import './home.css'
import { useEffect, useState } from 'react'
import { Module } from '../../domain/module'
import { moduleService } from '../../components/services/moduleService'

const dividerStyles = {
    backgroundColor: '#ffffff',
    height: '2px',
    margin: '2rem 4rem',
  }

export const Home = () => {
    
    const [ modules , setModules ] = useState<Module[]>()

    const getModules = async () => {
        try{
            const res = await moduleService.getModules()
            setModules(res) 
        } catch (e : unknown) {
            console.log(e)
        }
    }

    useEffect(() => {
        getModules()
    })

    return(
        <>
            <h1>Modulos</h1>
            <Divider style = { dividerStyles } />
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