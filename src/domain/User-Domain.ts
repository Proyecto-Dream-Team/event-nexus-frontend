

export class FormCreateUss {
    nombre: string;
    apellido: string;
    email: string;
    direccion: string;
    telefono: string;
    permisos: string[] ;
    roles: string[] ;

    constructor(
        nombre: string = "",
        apellido: string = "",
        email: string = "",
        direccion: string = "",
        telefono: string = "",
        permisos: string[] = [],
        roles: string[] = []
    ) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.direccion = direccion;
        this.telefono = telefono;
        this.permisos = permisos;
        this.roles = roles;
    }

    static toDto(data: FormCreateUss): any{
        return {
            nombre: data.nombre,
            apellido: data.apellido,
            email: data.email,
            direccion: data.direccion,
            telefono: data.telefono,
            permisos: data.permisos,
            roles: data.roles
        }
    }

}

export class FormCreateFormularyAdmin {
    name: string;
    lastName: string;
    email: string;
    address: string;
    phone: string;
    permissions: string[] ;
    role: string ;

    constructor(
        nombre: string = "",
        apellido: string = "",
        email: string = "",
        address: string = "",
        phone: string = "",
        permisos: string[] = [],
        roles: string = ""
    ) {
        this.name = nombre;
        this.lastName = apellido;
        this.email = email;
        this.address = address;
        this.phone = phone;
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