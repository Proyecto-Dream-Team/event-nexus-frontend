import './radioInput.css'

interface RadioInputProps {
    label: string;
    value: string;
    register: any;
    disable: boolean;
}

export const RadioInput = ({ label, value, register, disable} : RadioInputProps) => {
    return (
        <>
            {disable && (
                <div>
                <label className="event-type-option">
                               <input className="event-type-radio"
                                   type="radio"
                                   value={label}
                                   {...register}
                            
                               />
                               <span className="keySpan">{label}</span>
                           </label>
           </div>
            )}
        </>
    )

}