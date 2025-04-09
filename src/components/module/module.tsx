import './module.css'
import {  Module } from '../../domain/module'

export const ModuleCard = ( {value} : {value : Module} ) => {

    return(
        <>
            <article className="button-square">
                <h2>{value.name}</h2>
                <img src={value.img}  />
            </article>
        </>
    )
}