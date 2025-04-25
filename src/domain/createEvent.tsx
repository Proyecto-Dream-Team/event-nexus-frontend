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
    creatorName:string
    creatorImage: string
    dateFinished: Date
    title: string
    description: string
    isActive: boolean 
    numberOfParticipants: number
    img: string

    constructor(
      id: number,
      creatorName:string,
      creatorImage: string,
      dateFinished: Date,
      title: string,
      description: string,
      isActive: boolean,
      participantsAmount: number,
      img: string
    ) {

        this.id = id
        this.creatorName = creatorName
        this.creatorImage = creatorImage
        this.dateFinished = dateFinished
        this.title = title
        this.description = description
        this.isActive = isActive
        this.numberOfParticipants = participantsAmount
        this.img = img

    }

}

export class EmployeeEvents{
  createdEvents: EventDto[]
  invitedEvents: EventDto[]

  constructor(
    createdEvents: EventDto[],
    invitedEvents: EventDto[]
  ){
    this.createdEvents = createdEvents
    this.invitedEvents = invitedEvents
  }
}
// export const event : EventDto = new EventDto(1, new Date("2023-10-10"), "Tomar Cerveza", 10, "Ir a la casa del colorado y tomarle toda la birra", "Juan", "Perez", "img1.jpg", true)
// export const myEvent : EventDto = new EventDto(2, new Date("2023-10-11"), "Actividad Grupal", 20, "Hacer una actividad grupal con los chicos de la empresa", "Maria", "Lopez", "img2.jpg", false)