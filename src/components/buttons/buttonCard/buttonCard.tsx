import './buttonCard.css';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

interface ButtonProps {
    label: string;
    method: () => void;
    isCancel: boolean;
}

export const ButtonCard = ({ label, method, isCancel }: ButtonProps) => {
    return (
        <>
            <button 
                className={`buttonCard ${isCancel ? 'buttonCard-cancel' : 'buttonCard-acept'}`} 
                onClick={method}
            >
                <p>{label}</p>
                {isCancel ? (
                    <ThumbDownAltIcon style={{ marginLeft: '10px', width: '2rem', height: '1.9rem' }} />
                ) : (
                    <ThumbUpAltIcon style={{ marginLeft: '10px', width: '2rem', height: '1.9rem' }} />
                )}
            </button>
        </>
    );
}
