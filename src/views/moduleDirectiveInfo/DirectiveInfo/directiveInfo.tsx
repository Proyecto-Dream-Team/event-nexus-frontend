import { DirectiveInfoData, Priority } from '../../../domain/directiveInfo'
import { CardDirectiveInfo } from './cardDirectiveInfo'
import { useEffect, useState } from 'react'
import { serviceUser } from '../../../services/serviceUser'
import './directiveInfo.css'
import { directiveInfoService } from '../../../services/directiveInfoService'
import { Box, Button, Chip, createTheme, TextField } from '@mui/material'

export const DirectiveInfo = () => {

    const theme = createTheme()
    const [directive, setDirective] = useState<DirectiveInfoData[]>([])

    const [canCreate, setCanCreate] = useState(false);

    const [title, setTitle] = useState('');

    const [description, setDescription] = useState('');

    const [priority, setPriority] = useState<'URGENTE' | 'IMPORTANTE' | 'INFORMATIVO' | null>(null);

    const userId = Number(sessionStorage.getItem("userId"));

    const createDirective = async () => {
        if (!priority || !title || !description) {
            alert("Completa todos los campos y selecciona una prioridad");
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
            resetValues()
        } catch (error: any) {
            console.error("Error al crear directiva:", error.message);
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
            console.error("Error al obtener permisos: ", error.message);
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
            {/* <div>ACA IRIA FILTER</div> */}
            <div className='scrollable-adrian'>
                <section className="scrollable-content">
                    {directive.map((directive, index) => (
                        <CardDirectiveInfo key={index} value={directive} />
                    ))}
                </section>
                {canCreate ? (
                    <>
                        <div className='create-directive'>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Box sx={{ width: '80%', display: 'flex', flexDirection: 'column', gap: 2, padding: "1rem" }}>

                                    <TextField
                                        label="titulo"
                                        multiline
                                        minRows={1}
                                        fullWidth
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        sx={{
                                            backgroundColor: 'white',
                                            borderRadius: '1rem',
                                        }}
                                    />
                                    <TextField
                                        label="Descripción"
                                        multiline
                                        minRows={1}
                                        fullWidth
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        sx={{
                                            backgroundColor: 'white',
                                            borderRadius: '1rem',
                                        }}
                                    />

                                    <Box sx={{ display: 'flex', gap: 1 , width: '35%'}}>
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
                                            variant={priority === 'IMPORTANTE' ? 'filled' : 'outlined'}
                                            onClick={() => setPriority('IMPORTANTE')}
                                        />
                                        <Chip
                                            label="Informativo"
                                            color="primary"
                                            size='small'
                                            variant={priority === 'INFORMATIVO' ? 'filled' : 'outlined'}
                                            onClick={() => setPriority('INFORMATIVO')}
                                        />

                                    </Box>
                                </Box>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={createDirective}
                                    sx={{ borderRadius: '1rem', height: '10rem' }}
                                >
                                    Crear
                                </Button>
                            </Box>

                        </div>

                    </>
                ) : null}
            </div>
        </>
    );
}