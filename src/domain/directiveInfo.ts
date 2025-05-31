export class DirectiveInfoData {
    idCreator: number;
    titulo: string;
    fecha: string;
    descripcion: string;

    constructor(idCreator: number, titulo: string, fecha: string, descripcion: string) {
        this.idCreator = idCreator;
        this.titulo = titulo;
        this.fecha = fecha;
        this.descripcion = descripcion;
    }
}