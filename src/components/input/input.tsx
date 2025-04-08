import './input.css'


interface InputProps {
    label: string;
    type: string;
    register: any;
    readonly: boolean;
}

export const InputApp = ({label, type, register, readonly}: InputProps) => {


    return (
        <div className="inputContainer">
          <label className="input-label" >{label}</label>
          <input
            type={type}
            placeholder={`Escribe tu ${label}`}
            className={`input-type ${readonly ? '' : 'input-readonly'}`}
            readOnly={readonly}
          />
        </div>
      );


}