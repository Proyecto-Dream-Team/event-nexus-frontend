import { useEffect, useState } from 'react'
import { ModuleCard } from '../../components/module/module'
import { Title } from '../../components/title/title'
import { Module } from '../../domain/module'
import { moduleService } from '../../services/moduleService'
import './home.css'
import { mock } from '../../services/notification.service'

export const Home = () => {

    const [modules, setModules] = useState<Module[]>()
    const id = Number(sessionStorage.getItem("userId"));

    async function clickMock(){
        try{
            mock()
        }
        catch(e:any){
            
        }
    }
    const getModules = async () => {
        try {
            const res = await moduleService.getModules(id)
            setModules(res)
        } catch (e: unknown) {
            console.log(e)
        }
    }

    useEffect(() => {
        getModules()
    }, [])

    return (
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
                <button onClick={clickMock}>ACTIVAR NOTIFICACIONES</button>
                <img className='image-home' src = "EventNexusImagotipo.png"/>
            </main>
        </>
    )

}