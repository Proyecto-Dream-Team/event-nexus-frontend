import { InputApp } from "../input/input"
import './profileFormulary.css'
import { ButtonApp } from "./../buttons/button"

export const ProfileFormulary = () => {

    const acept = () => {
        console.log('aceptar')
    }
    const cancel = () => {
        console.log('cancelar')
    }



    return (
        <>
            <form className='profileFormulary' action="">
                <InputApp label={'Nombre'} type={'text'} register={false}></InputApp>
                <InputApp label={'Apellido'} type={'text'} register={false}></InputApp>
                <InputApp label={'Telefono'} type={'number'} register={false}></InputApp>
                <InputApp label={'E-Mail'} type={'mail'} register={false}></InputApp>
                
                <div className="buttons">
                <ButtonApp label={'Aceptar'} method={acept}></ButtonApp>
                <ButtonApp label={'Cancelar'} method={cancel}></ButtonApp>

                </div>

            </form>
        </>
    )
}