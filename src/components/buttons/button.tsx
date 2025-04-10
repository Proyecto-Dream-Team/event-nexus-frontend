import './button.css';

interface ButtonProps {
    label: string;
    method : () => void;
    isCancel: boolean;
}


export const ButtonApp = ({label,method, isCancel} : ButtonProps) => {
    return (
        <>
            <button 
            className={`buttonApp ${isCancel ? 'button-cancel' : 'button-acept'}`}>{label}</button>
        </>
    );
}
