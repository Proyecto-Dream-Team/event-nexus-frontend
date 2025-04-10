export class DatosForm {
    nombre: string;
    apellido: string;
    telefono: number;
    email: string;
    direccion: string;

    constructor(data : any) {
        this.nombre = data.nombre;
        this.apellido = data.apellido;
        this.telefono = data.telefono;
        this.email = data.email;
        this.direccion = data.direccion;
    }


    fromDto(data: any) {
        return {
            nombre: data.nombre,
            apellido: data.apellido,
            telefono: data.telefono,
            email: data.email,
            direccion: data.direccion
        };
    }
}

export class LoginForm{
    user: string;
    password: string;

    constructor(data : any) {
        this.user = data.nombre;
        this.password = data.apellido;
    }


    fromDto(data: any) {
        return {
            user: data.user,
            password: data.password,
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

export const loginForm = new LoginForm({
    user: "",
    password: ""
})