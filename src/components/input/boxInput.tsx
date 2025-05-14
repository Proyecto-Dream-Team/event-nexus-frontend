interface BoxInputProps {
    label: string;
    value: string;
    register: any;
    error: string;
}

export const BoxInput = ({ label, value, register, error }: BoxInputProps) => {


    return (

        <>
            <div className="event-type-options">
                <label className="event-type-option">
                    <input
                        className="event-type-radio"
                        type="checkbox"
                        value={value}
                        {...register}
                    />
                    <span className="keySpan">{label}</span>
                </label>

            </div>
            <div className='error-container'>
                {error && <span className="error-message">{error}</span>}
            </div>
        </>

    )



}