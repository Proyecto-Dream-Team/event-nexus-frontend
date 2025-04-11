// import { LoginRequestDTO } from "../dtos/LoginRequestDTO"
// import { LoginResponseDTO } from "../dtos/LoginResponseDTO"

// export enum Rol {
//     USUARIO = "client",
//     CHOFER = "driver"
//   }

// export class Client{
//     constructor(
//         public id: number,
//         public nombre: string,
//         public apellido: string,
//         public username: string,
//         public password: string,
//         public rol: Rol
//     ){}

//     static fromDTOloginResponse(data: Client): LoginResponseDTO {
//         return Object.assign(
//             new LoginResponseDTO(
//                 data.id,
//                 data.username,
//                 data.rol
//         ))
//     }

//     static toDTOloginRequest(data: Client): LoginRequestDTO {
//         return Object.assign(
//             new LoginRequestDTO(
//                 data.username,
//                 data.password
//         ))
//     }

// }