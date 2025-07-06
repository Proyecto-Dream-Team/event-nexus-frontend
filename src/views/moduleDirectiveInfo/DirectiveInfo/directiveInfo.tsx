import { DirectiveInfoData, Priority } from '../../../domain/directiveInfo'
import { CardDirectiveInfo } from './cardDirectiveInfo'
import { useEffect, useState } from 'react'
import { serviceUser } from '../../../services/serviceUser'
import './directiveInfo.css'
import { directiveInfoService } from '../../../services/directiveInfoService'
import { Box, Button, Chip, TextField } from '@mui/material'
import { StyledFloatingButtonRight } from '../../moduleEvents/events/eventFilter.style'
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import { useToast } from '../../../context/toast/useToast'

export const DirectiveInfo = () => {

    const userId = Number(sessionStorage.getItem("userId"));
    
    const [directive, setDirective] = useState<DirectiveInfoData[]>([])
    
    const [showCreate, setShowCreate] = useState(false);

    const [canCreate, setCanCreate] = useState(false);

    const [title, setTitle] = useState('');

    const [description, setDescription] = useState('');

    const [priority, setPriority] = useState<'URGENTE' | 'IMPORTANTE' | 'INFORMATIVO' | null>(null);

    const toast = useToast()


    const createDirective = async () => {
        if (!priority || !title || !description) {
            toast.open("Completar todos los campos","error")
            return;
        }

        const newDirective = new DirectiveInfoData(
            userId,
            title,
            description,
            priority.toLowerCase() as Priority
        );

        try {
            await directiveInfoService.createDirectiveInfo(newDirective);
            setShowCreate(false)
            toast.open("Directiva creada con exito","success")
            resetValues()
        } catch (error: any) {
            toast.open(error.message, "error" );
        }
    };

    const resetValues = () => {
        getDirectives();
        setDescription('');
        setTitle('')
        setPriority(null);
    }

    const getDirectives = async () => {
        try {
            const res = await directiveInfoService.fetchDirectives()
            setDirective(res)
        } catch (error: any) {
            toast.open(error.message, "error" );
        }
    }

    async function getPermissions() {
        try {
            const permissions = await serviceUser.getPermissionsUser(userId, "DIRECTIVE");
            setCanCreate(permissions.length != 0);
        }
        catch (error: any) {
            console.error("Error al obtener permisos: ", error.message);
        }
    }
    useEffect(() => {
        getPermissions()
        getDirectives()
    }, []);

    return (
        <>
            <div className='scrollable'>
                <section className="scrollable-content">
                    {directive.map((directive, index) => (
                        <CardDirectiveInfo key={index} value={directive} />
                    ))}
                </section>
                {canCreate ? (
                    <>
                        <StyledFloatingButtonRight 
                            color= { showCreate ? "error" : "primary"  }  
                            aria-label="add" 
                            sx={{'&:hover':{backgroundColor: !showCreate ? 'primary.main' : 'error.main'}}}
                            onClick={() => setShowCreate(!showCreate)}
                        >
                            { showCreate ? (
                                    <SouthIcon/>
                                ) : (
                                    <NorthIcon/>
                                )
                            }
                        </StyledFloatingButtonRight>

                        <div className={`create-directive ${showCreate ? 'show' : ''}`}>
                                {canCreate && (
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Box sx={{ width: '85%', display: 'flex', flexDirection: 'column', gap: 2, padding: "1rem 1rem 5rem 0"}}>
                                        <TextField
                                            label="titulo"
                                            multiline
                                            minRows={1}
                                            fullWidth
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            sx={{ backgroundColor: 'var(--text-color--inverted)', borderRadius: '1rem' }}
                                        />
                                        <TextField
                                            label="Descripción"
                                            multiline
                                            minRows={2}
                                            fullWidth
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            sx={{ backgroundColor: 'var(--text-color--inverted)', borderRadius: '1rem' }}
                                        />

                                        <Box sx={{ display: 'flex', gap: 1 , width: '35%', margin: 0}}>
                                            <Chip
                                                label="Urgente"
                                                color="error"
                                                size='small'
                                                variant={priority === 'URGENTE' ? 'filled' : 'outlined'}
                                                onClick={() => setPriority('URGENTE')}
                                            />
                                            <Chip
                                                label="Importante"
                                                color="warning"
                                                size='small'
                                                sx={{color:priority == "IMPORTANTE" ? 'white': 'orange'}}
                                                variant={priority === 'IMPORTANTE' ? 'filled' : 'outlined'}
                                                onClick={() => setPriority('IMPORTANTE')}
                                            />
                                            <Chip
                                                label="Informativo"
                                                color="primary"
                                                size='small'
                                                variant={priority === 'INFORMATIVO' ? 'filled' : 'outlined'}
                                                sx={{'&:hover':{backgroundColor:'primary.main'}}}
                                                onClick={() => setPriority('INFORMATIVO')}
                                            />
                                        </Box>
                                    </Box>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className='mock-para-pica'
                                        onClick={createDirective}
                                        sx={{ borderRadius: '1rem', height: '11rem' , marginTop : 1.5, '&:hover':{backgroundColor:'primary.main'} }}
                                    >
                                        Crear
                                    </Button>
                                </Box>
                                )}
                        </div>

                    </>
                ) : null}
            </div>
        </>
    );
}