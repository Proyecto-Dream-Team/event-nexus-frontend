export class CreateEventDTO {
    creatorId: number;
    participantsIds: number[];
    date: Date;
    name: string;
    description: string;
  
    constructor(
      creatorId: number,
      participantsIds: number[],
      date: Date,
      name: string,
      description: string,
    ) {
      this.creatorId = creatorId;
      this.participantsIds = participantsIds;
      this.name = name;
      this.description = description;
      this.date = date;
    }
  }

export class EventDto{
    id: number
    fecha: Date
    title: string
    participates: number
    description: string
    nombre: string
    apellido: string
    img: string
    isActive: boolean 

    constructor(id: number, fecha: Date, title: string, participates: number, description: string, nombre: string, apellido: string , img: string , isActive: boolean) {

        this.id = id
        this.fecha = fecha
        this.title = title
        this.participates = participates
        this.description = description
        this.nombre = nombre
        this.apellido = apellido
        this.img = img
        this.isActive = isActive

    }

}

export const event : EventDto = new EventDto(1, new Date("2023-10-10"), "Tomar Cerveza", 10, "Ir a la casa del colorado y tomarle toda la birra", "Juan", "Perez", "img1.jpg", true)
export const myEvent : EventDto = new EventDto(2, new Date("2023-10-11"), "Actividad Grupal", 20, "Hacer una actividad grupal con los chicos de la empresa", "Maria", "Lopez", "img2.jpg", false)