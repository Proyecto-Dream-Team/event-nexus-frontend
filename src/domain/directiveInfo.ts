export class DirectiveInfoData {
    creatorId: number;
    creatorImage: string;
    title: string;
    date: string;
    description: string;

    constructor(idCreator: number, titulo: string, fecha: string, descripcion: string, creatorImage:string) {
        this.creatorId = idCreator;
        this.creatorImage = creatorImage;
        this.title = titulo;
        this.date = fecha;
        this.description = descripcion;
    }
}