type Priority = "urgente" | "importante" | "informativo" 

export class DirectiveInfoData {
    creatorId: number;
    creatorImage: string;
    title: string;
    date: Date;
    description: string;
    priorityName: Priority

    constructor(idCreator: number, creatorImage:string, titulo: string, date: Date, descripcion: string, priority : Priority) {
        this.creatorId = idCreator;
        this.creatorImage = creatorImage;
        this.title = titulo;
        this.date = date;
        this.description = descripcion;
        this.priorityName = priority
    }
}