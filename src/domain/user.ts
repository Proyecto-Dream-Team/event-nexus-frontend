export class User {
    
}

export class SesionStorage {
    
    constructor(
        public id: number,
        public name: string,
        public lastname: string,
        public image: string,
        public rol: string
    ) {
        this.id = id
        this.name = name
        this.lastname = lastname
        this.image = image
        this.rol = rol
    }

}

export class HeaderDto {
    constructor(
        public id: number,
        public name: string,
        public lastname: string,
    ) {}

    static fromDto(data : any): HeaderDto {
        return new HeaderDto(
            data.id,
            data.name,
            data.lastname,
        )
    }
}

