export class CreateEventDTO {
    title : string
    date  : Date
    description: string
    constructor(title : string , date : Date , description : string ){
        this.title = title
        this.date  = date
        this.description = description
    }
}