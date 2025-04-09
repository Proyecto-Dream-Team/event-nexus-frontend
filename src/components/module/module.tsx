import { useState } from 'react'
import './module.css'
import { moduleCard, ModuleCard } from '../../domain/module'

export const Module = () => {

    const [module,setModule] = useState<ModuleCard>(moduleCard)

    return(
        <>
            <article className="button-square">
                <h2>{module.name}</h2>
                <img src={module.img}  />
            </article>
        </>
    )
}