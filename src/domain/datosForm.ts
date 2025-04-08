export class DatosForm {
    nombre: string;
    apellido: string;
    telefono: number;
    email: string;
    direccion: string;

    constructor(any : any) {
        this.nombre = any.nombre;
        this.apellido = any.apellido;
        this.telefono = any.telefono;
        this.email = any.email;
        this.direccion = any.direccion;
    }


    fromDto(any: any) {
        return {
            nombre: any.nombre,
            apellido: any.apellido,
            telefono: any.telefono,
            email: any.email,
            direccion: any.direccion
        };
    }
}

export const datosForm = new DatosForm({
    nombre: 'Diego',
    apellido: 'Lentz',
    telefono: 1538969112,
    email: 'diegoolentz@gmail.com',
    direccion: 'artigas 5521'
});