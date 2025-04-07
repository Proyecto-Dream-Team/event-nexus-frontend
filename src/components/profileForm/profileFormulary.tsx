import { InputApp } from "../input/input"
import './profileFormulary.css'

export const ProfileFormulary = () => {



    return (
        <>
            <form className='profileFormulary' action="">
                <InputApp label={'Nombre'} type={'text'} register={false}></InputApp>
                <InputApp label={'Apellido'} type={'text'} register={false}></InputApp>
                <InputApp label={'Telefono'} type={'number'} register={false}></InputApp>
                <InputApp label={'E-Mail'} type={'mail'} register={false}></InputApp>
                

            </form>
        </>
    )
}