import { InputApp } from "../input/input"
import './profileFormulary.css'
import { ButtonApp } from "./../buttons/button"
import { DatosForm } from "../../domain/datosForm"

interface ProfileFormularyProps {
    info: DatosForm
}



export const ProfileFormulary = ({ info }: ProfileFormularyProps) => {

    const acept = () => {
        console.log('aceptar')
    }
    const cancel = () => {
        console.log('cancelar')
    }



    return (
        <>
            <form className='profileFormulary' action="">
                <InputApp label={'Nombre'} type={'text'} register={false} readonly={true}></InputApp>
                <InputApp label={'Apellido'} type={'text'} register={false} readonly={true}></InputApp>
                <InputApp label={'Telefono'} type={'number'} register={false} readonly={false}></InputApp>
                <InputApp label={'E-Mail'} type={'mail'} register={false} readonly={false}></InputApp>
                <InputApp label={'Direccion'} type={'text'} register={false} readonly={false}></InputApp>
                
                <div className="buttons">
                <ButtonApp label={'Aceptar'} method={acept}></ButtonApp>
                <ButtonApp label={'Cancelar'} method={cancel}></ButtonApp>

                </div>

            </form>
        </>
    )
}