import './module.css'
import { Module } from '../../domain/module'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Divider, IconButton } from '@mui/material'
import EastIcon from '@mui/icons-material/East';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export const ModuleCard = (
    { value, setIndex }: { value: Module, setIndex: React.Dispatch<React.SetStateAction<number>> }
) => {

    const nav = useNavigate();
    
    function handleTitle() {
        const currentPath = location.pathname;
        const matchedLabel = Object.keys(pathToLabelMap).find(path => {

            return currentPath === path || currentPath.startsWith(path.replace(/:id/, ''));
        });
        props.stateDispatcher(matchedLabel ? pathToLabelMap[matchedLabel] : paths.login.label);
    }

    return (
        <>

            <Card className='card' >
                <IconButton
                    onClick={(e) => (setIndex((prev) => prev == 0 ? 2 : prev - 1))}
                    sx={{ width: 'fit-content', height: 'fit-content' }}
                    className='arrow__back'>
                    <ArrowBackIcon></ArrowBackIcon>
                </IconButton>
                <div className='contenido-card'>

                    <p className='text'>{value.description}</p>
                    {/* <Divider orientation="vertical" variant="middle" flexItem /> */}
                    <img src={`./icons/${value.image}`} className='icon-module' />
                    <div className='icono' onClick={() => nav("/module-events/all-events")}>
                        <EastIcon fontSize="large" />
                    </div>
                </div>
                <IconButton
                    onClick={(e) => (setIndex((prev) => prev == 2 ? 0 : prev + 1))}
                    sx={{ width: 'fit-content', height: 'fit-content' }}
                    className='arrow__forward'>
                    <ArrowForwardIcon></ArrowForwardIcon>
                </IconButton>
            </Card>
        </>
    );
};