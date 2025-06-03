import { DirectiveInfoData } from '../../../domain/directiveInfo'
import { CardDirectiveInfo } from './cardDirectiveInfo'
import { useEffect, useState } from 'react'
import { serviceUser } from '../../../services/serviceUser'
import './directiveInfo.css'
import { fetchDirectives } from '../../../services/directiveInfoService'

export const DirectiveInfo = () => {

    const [directive,setDirective] = useState<DirectiveInfoData[]>([])

    const [canCreate, setCanCreate] = useState(false);

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
            <button disabled={!canCreate}>boton</button>
            <section className="scrollable-content">

                {directive.map((directive, index) => (
                    <CardDirectiveInfo key={index} value={directive} />
                ))}
            </section>
            
        </>
      );
}