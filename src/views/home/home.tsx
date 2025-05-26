import { useEffect, useState } from 'react'
import { ModuleCard } from '../../components/module/module'
import { Title } from '../../components/title/title'
import { Module } from '../../domain/module'
import { moduleService } from '../../services/moduleService'
import './home.css'
import { trySSE } from '../../services/notification.service'
import { URL_SERVIDOR_REST } from '../../utils/config'

export const Home = () => {
    // const eventSource:EventSource = new EventSource(`${URL_SERVIDOR_REST}/notification?userId=${Number(localStorage.getItem("userId"))}`);
    const [modules, setModules] = useState<Module[]>()
    const id = Number(sessionStorage.getItem("userId"));
    const [counter, setCounter] = useState(0)
    function tryConectionSEE(){
        // trySSE(setCounter)
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
                {/* <button onClick={tryConectionSEE}>ACTIVAR NOTIFICACIONES {counter}</button> */}
                <img className='image-home' src = "EventNexusImagotipo.png"/>
            </main>
        </>
    )

}