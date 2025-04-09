export class Module {
    constructor(
        public name : string,
        public img  : string
    ) {}
} 

export const moduleMock = new Module(
    'Eventos' ,
    "fotoEventosSinFondo.png"
)   

export const arrayModulMock : Module[] = [moduleMock,moduleMock]