type Priority = "HIGH" | "MEDIUM" | "LOW" 

export class DirectiveInfoData {
    creatorId: number;
    creatorImage: string;
    title: string;
    date: Date;
    description: string;
    priority: Priority

    constructor(idCreator: number, creatorImage:string, titulo: string, date: Date, descripcion: string, priority : Priority) {
        this.creatorId = idCreator;
        this.creatorImage = creatorImage;
        this.title = titulo;
        this.date = date;
        this.description = descripcion;
        this.priority = priority
    }
}