export class Module {
    constructor(
        public id   : number,
        public name : string,
        public image  : string
    ) {}
} 

export const moduleMock = new Module(
    0,
    'Eventos' ,
    "fotoEventosSinFondo.png"
)   

export const arrayModulMock : Module[] = [moduleMock,moduleMock]