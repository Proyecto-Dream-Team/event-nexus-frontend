export class DirectiveInfoData {
    idCreator: number;
    name: string
    imageProfile: string;
    date: string;
    description: string;
    canCreate: boolean;

    constructor(idCreator: number,name:string, imageProfile: string, date: string, description: string, canCreate: boolean) {
        this.idCreator = idCreator;
        this.name = name
        this.imageProfile = imageProfile;
        this.date = date;
        this.description = description;
        this.canCreate = canCreate;
    }
}