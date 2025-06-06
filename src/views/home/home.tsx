import { useEffect, useState } from 'react'
import { ModuleCard } from '../../components/module/module'
import { Module } from '../../domain/module'
import { moduleService } from '../../services/moduleService'
import './home.css'
import { Box, Button, ButtonGroup, Typography } from '@mui/material'


export const Home = () => {
    const [modules, setModules] = useState<Module[]>([])
    const id = Number(sessionStorage.getItem("userId"));
    const [selectedModule, setSelectedModule] = useState<Module>(new Module(0, "asd", "asd", "asd"))
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)

    const getModules = async () => {
        try {
            setLoading(true)
            const res = await moduleService.getModules(id)
            console.log(res)
            setModules(res)
            setSelectedModule(res[0])
            setLoading(false)
        } catch (e: unknown) {
            console.log(e)
        }
    }

    useEffect(() => {
        getModules()
    }, [])

    useEffect(() => {
        setSelectedModule(modules[selectedIndex])
    }, [selectedIndex])

    if(loading){
        return <div>CARGANDO</div>
    }
    return (
        <>     
            <Box>
                <ButtonGroup variant="contained" aria-label="Basic button group">
                    {modules.map((module, index)=>(
                        <Button onClick={(e)=>(setSelectedModule(module))} disabled={selectedModule==module}>
                            {module.name}
                        </Button>
                    ))}
                </ButtonGroup>
            </Box>
            <main className='main' >
                <ModuleCard value={selectedModule} setIndex={setSelectedIndex} />
                <img className='image-home' src="EventNexusImagotipo.png" />
            </main>
        </>
    )

}