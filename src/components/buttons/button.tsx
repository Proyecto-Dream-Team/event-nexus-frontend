
interface ButtonProps {
    label: string;
    method : () => void;
}


export const ButtonApp = ({label,method} : ButtonProps) => {
    return (
        <>
            <button className='buttonApp'>{label}</button>
        </>
    );
}
