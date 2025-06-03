export class DirectiveInfoData {
    creatorId: number;
    title: string;
    date: string;
    description: string;

    constructor(idCreator: number, titulo: string, fecha: string, descripcion: string) {
        this.creatorId = idCreator;
        this.title = titulo;
        this.date = fecha;
        this.description = descripcion;
    }
}