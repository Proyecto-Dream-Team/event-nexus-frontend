import { DirectiveInfoData } from "../domain/directiveInfo";

class DiretiveInfoService {

    async createDirectiveInfo(directiveInfoData: DirectiveInfoData): Promise<void> {
        console.log("Creating directive info:", directiveInfoData);
    }

}

export const directiveInfoService = new DiretiveInfoService();