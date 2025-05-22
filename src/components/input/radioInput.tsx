import './radioInput.css'

interface RadioInputProps {
    label: string;
    value: string;
    register: any;
}

export const RadioInput = ({ label, value, register} : RadioInputProps) => {
    return (
        <>
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
            
        </>
    )

}