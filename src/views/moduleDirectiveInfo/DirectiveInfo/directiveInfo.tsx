import { DirectiveInfoData } from '../../../domain/directiveInfo'
import { CardDirectiveInfo } from './cardDirectiveInfo'
import { useEffect, useState } from 'react'
import { serviceUser } from '../../../services/serviceUser'
import './directiveInfo.css'
import { fetchDirectives } from '../../../services/directiveInfoService'
import { Box, Button, Chip, TextField } from '@mui/material'

export const DirectiveInfo = () => {

    const [directive,setDirective] = useState<DirectiveInfoData[]>([])

    const [canCreate, setCanCreate] = useState(false);

    const [priority, setPriority] = useState<'URGENTE' | 'IMPORTANTE' | 'INFORMATIVO' | null>(null);

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
            const userId = Number(sessionStorage.getItem("userId"));
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
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', gap: 2, width: '80%' }}>
                    <TextField
                        label="Crear directiva"
                        variant="outlined"
                        fullWidth
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: '1rem',
                        }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
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
      );
}