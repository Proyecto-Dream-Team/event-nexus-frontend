type Priority = "HIGH" | "MEDIUM" | "LOW" 

export class DirectiveInfoData {
    creatorId: number;
    creatorImage: string;
    title: string;
    date: string;
    description: string;
    priority: Priority

    constructor(idCreator: number, creatorImage:string, titulo: string, fecha: string, descripcion: string, priority : Priority) {
        this.creatorId = idCreator;
        this.creatorImage = creatorImage;
        this.title = titulo;
        this.date = fecha;
        this.description = descripcion;
        this.priority = priority
    }
}