import './input.css';

interface InputProps {
	label: string;
	type: string;
	register: any;
	readonly: boolean;
	error: string;
}

export const InputApp = ({ label, type, register, readonly, error }: InputProps) => {
	return (
		<div className="inputContainer">
		<label className="input-label">{label}</label>
		<input
			className={`input-type ${readonly ? '' : 'input-readonly'} ${error ? 'input-error' : ''}`}
			type={type}
			readOnly={readonly}
			{...register}
			placeholder={`Escribe tu ${label}`}
		/>
		<div className='error-container'>
			{error && <span className="error-message">{error}</span>}
		</div>
		</div>
	);
};
