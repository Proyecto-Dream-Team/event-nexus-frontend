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

export const sesionStorage = new SesionStorage(
    0,
    "Pedro",
    "McGeraghty",
    "profileImage.png",
    "admin"
) 

export const sesionStorage1 = new SesionStorage(
    0,
    "Pedro",
    "McGeraghty",
    "profileImage.png",
    "admin"
) 

export const sesionStorage2 = new SesionStorage(
    0,
    "Pedro",
    "McGeraghty",
    "profileImage.png",
    "admin"
) 

export const sesionStorages = [sesionStorage,sesionStorage1,sesionStorage2]
