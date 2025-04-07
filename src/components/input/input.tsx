import './input.css'


interface InputProps {
    label: string;
    type: string;
    register: boolean;
}

export const InputApp = ({label,type,register}:InputProps) => {


    return (
        <div className="inputContainer">
            <label className='input-label' htmlFor="input">{label}</label>
            <input className='input-type' type={type} name="label" id="" placeholder="Escribe tu nombre" />
        </div>
    )


}