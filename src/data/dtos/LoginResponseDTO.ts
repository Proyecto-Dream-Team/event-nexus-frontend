import { Rol } from "../domains/User-Domain";s

export class LoginResponseDTO {
    constructor(public id: number, public username: string, public rol: Rol ) {}
  }
  