export class PermissionsApp{
    roles: string[];
    permissions: string[];
    
    constructor(data: any) {
        this.roles = data.roles;
        this.permissions = data.permissions;
    } 
}

export type PermissionType = "EVENT" | "DIRECTIVE" | "REPORT" | "ADMIN"
