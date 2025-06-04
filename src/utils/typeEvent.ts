import { EventCategory } from "../domain/eventTypes";

export const eventColorMapping: Record<EventCategory, string> = {
  SOCIAL: "error.light",    // O 'success.main' si usas el tema de Material UI
  DEPORTIVO: "success.light",       // O 'primary.main'
  CAPACITACION: "secondary.light",    // O 'secondary.main'
  EJECUTIVO: "primary.light",   // O 'warning.main'
  EQUIPO: "warning.light",      // O 'error.main'
  BENEFICO: "primary.main",   // O 'warning.main'
};



// export EventsCategoryConfiguration: EventCategory2[] = []

export class PermissionsApp{
    roles: string[];
    permissions: string[];
    
    constructor(data: any) {
        this.roles = data.roles;
        this.permissions = data.permissions;
    } 
}

export type PermissionType = "EVENT" | "DIRECTIVE" | "REPORT" | "ADMIN"