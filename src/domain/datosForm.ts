export class DatosForm {
    id: number;
    nombre: string;
    apellido: string;
    phone: string;
    email: string;
    address : string;

    constructor(data : any) {
        this.id = data.id;
        this.nombre = data.nombre;
        this.apellido = data.apellido;
        this.phone = data.phone;
        this.email = data.email;
        this.address  = data.address ;
    }


    static fromDto(data: any) {
        return {
            id: data.id,
            nombre: data.name,
            apellido: data.lastName,
            phone: data.phone,
            email: data.email,
            address : data.address,
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
    id: 1,
    nombre: 'Diego',
    apellido: 'Lentz',
    telefono: "1538969112",
    email: 'diegoolentz@gmail.com',
    direccion: 'artigas 5521'
});

export const loginForm = new LoginForm({
    user: "",
    password: ""
})
