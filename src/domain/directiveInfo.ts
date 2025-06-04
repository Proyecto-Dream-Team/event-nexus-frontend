export type Priority = "urgente" | "importante" | "informativo" 

export class DirectiveInfoData {
    creatorId: number;
    creatorImage: string | null;
    title: string;
    date: Date | null;
    description: string;
    priorityName: Priority

    constructor(idCreator: number, titulo: string, descripcion: string, priority : Priority) {
        this.creatorId = idCreator;
        this.creatorImage = null;
        this.title = titulo;
        this.date = null;
        this.description = descripcion;
        this.priorityName = priority
    }
}