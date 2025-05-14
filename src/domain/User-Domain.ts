

export class FormCreateUss {
    nombre: string;
    apellido: string;
    email: string;
    permisos: string[] ;
    roles: string[] ;

    constructor(
        nombre: string = "",
        apellido: string = "",
        email: string = "",
        permisos: string[] = [],
        roles: string[] = []
    ) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.permisos = permisos;
        this.roles = roles;
    }

    static toDto(data: FormCreateUss): any{
        return {
            nombre: data.nombre,
            apellido: data.apellido,
            email: data.email,
            permisos: data.permisos,
            roles: data.roles
        }
    }

}

export class FormCreateFormularyAdmin {
    name: string;
    lastName: string;
    email: string;
    permissions: string[] ;
    role: string ;

    constructor(
        nombre: string = "",
        apellido: string = "",
        email: string = "",
        permisos: string[] = [],
        roles: string = ""
    ) {
        this.name = nombre;
        this.lastName = apellido;
        this.email = email;
        this.permissions = permisos;
        this.role = roles;
    }

    // static toDto(data: FormCreateFormularyAdmin): any{
    //     return {
    //         name: data.name,
    //         lastName: data.apellido,
    //         email: data.email,
    //         permissions: data.permisos,
    //         role: data.roles
    //     }
    // }

}