export enum EventType {
	SOCIAL = "https://img.freepik.com/fotos-premium/grupo-personas-diversas-estan-almorzando-juntos_53876-87748.jpg?semt=ais_hybrid&w=740",
	DEPORTIVO = "https://img.freepik.com/fotos-premium/gente-que-ejercita-gimnasio-aptitud_53876-189.jpg?semt=ais_hybrid&w=740",
	CAPACITACION = "https://img.freepik.com/fotos-premium/gente-negocios-reunion_53876-23607.jpg?semt=ais_hybrid&w=740",
	EJECUTIVO = "https://img.freepik.com/foto-gratis/sala-reuniones-negocios-renderizado-3d-edificio-oficinas_105762-2013.jpg?semt=ais_hybrid&w=740",
	EQUIPO = "https://img.freepik.com/foto-gratis/grupo-jovenes-empresarios-que-trabajan-oficina_158595-5210.jpg?semt=ais_hybrid&w=740",
}

export enum EventColor {
	SOCIAL = "rgb(255, 99, 71)",      
	DEPORTIVO = "rgb(44, 187, 104)",  
	CAPACITACION = "rgb(52, 152, 219)", 
	EJECUTIVO = "rgb(52, 80, 107)",    
	EQUIPO = "rgb(155, 89, 182)",     
}

export class PermissionsApp{
    roles: string[];
    permissions: string[];
    
    constructor(data: any) {
        this.roles = data.roles;
        this.permissions = data.permissions;
    } 
}

export type PermissionType = "EVENT" | "DIRECTIVE" | "REPORT" | "ADMIN"