import { DirectiveInfoData, Priority } from '../../../domain/directiveInfo'
import { CardDirectiveInfo } from './cardDirectiveInfo'
import { useEffect, useState } from 'react'
import { serviceUser } from '../../../services/serviceUser'
import './directiveInfo.css'
import { directiveInfoService, fetchDirectives } from '../../../services/directiveInfoService'
import { Box, Button, Chip, TextField } from '@mui/material'

export const DirectiveInfo = () => {

    const [directive,setDirective] = useState<DirectiveInfoData[]>([])

    const [canCreate, setCanCreate] = useState(false);

    const [priority, setPriority] = useState<'URGENTE' | 'IMPORTANTE' | 'INFORMATIVO' | null>(null);

    const [description, setDescription] = useState('');
    
    const userId = Number(sessionStorage.getItem("userId"));
    
    const createDirective = async () => {
        if (!priority || !description) {
          alert("Completa todos los campos y selecciona una prioridad");
          return;
        }
      
        const newDirective = new DirectiveInfoData(
            userId,
            "Socrates",
            description,
            priority.toLowerCase() as Priority // casteo a tipo correcto
        );
      
        try {
            await directiveInfoService.createDirectiveInfo(newDirective);
            console.log(directive)
            getDirectives(); // recargar directivas
            setDescription('');
            setPriority(null);
        } catch (error: any) {
            console.error("Error al crear directiva:", error.message);
        }
      };

    
    const getDirectives = async () => {
        try{
            const res = await fetchDirectives()
            setDirective(res)
        }catch (error: any) {
            console.error("Error al obtener permisos: ", error.message);
        }
    } 

    async function getPermissions() {
        try{
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
            <div className="fixed-background" />
            <section className="scrollable-content">
                {directive.map((directive, index) => (
                    <CardDirectiveInfo key={index} value={directive} />
                ))}
            </section>
            {canCreate ? (
                <>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box sx={{ display: 'flex', gap: 2, width: '80%' }}>
                            <TextField
                                label="Descripción"
                                multiline
                                minRows={2}
                                fullWidth
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                sx={{
                                    backgroundColor: 'white',
                                    borderRadius: '1rem',
                                }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={createDirective}
                                sx={{ borderRadius: '1rem', whiteSpace: 'nowrap' }}
                                >
                                Crear
                            </Button>
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Chip
                            label="Urgente"
                            color="error"
                            variant={priority === 'URGENTE' ? 'filled' : 'outlined'}
                            onClick={() => setPriority('URGENTE')}
                            />
                            <Chip
                            label="Importante"
                            color="warning"
                            variant={priority === 'IMPORTANTE' ? 'filled' : 'outlined'}
                            onClick={() => setPriority('IMPORTANTE')}
                            />
                            <Chip
                            label="Informativo"
                            color="primary"
                            variant={priority === 'INFORMATIVO' ? 'filled' : 'outlined'}
                            onClick={() => setPriority('INFORMATIVO')}
                            />
                        </Box>
                    </Box>
                </>
                ) : null}
        </>
      );
}