import './boxInput.css'

interface BoxInputProps {
    label: string;
    value: string;
    register: any;
}

export const BoxInput = ({ label, value, register}: BoxInputProps) => {


    return (

        <>
            <div className="container__radiobox">
                <label className="radiobox-input">
                    <input
                        className="event-type-radio"
                        type="checkbox"
                        value={value}
                        {...register}
                    />
                    <span className="keySpan">{label}</span>
                </label>

           
            </div>
        </>

    )



}