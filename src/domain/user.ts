export class User {
    
}

export class SesionStorage {
    
    constructor(
        public id: number,
        public name: string,
        public lastname: string,
        public img: string,
        public role: string
    ) {
        this.id = id
        this.name = name
        this.lastname = lastname
        this.img = img
        this.role = role
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

export const sesionStorage = new SesionStorage(
    0,
    "Pedro",
    "McGeraghty",
    "profileImage.png",
    "admin"
) 
