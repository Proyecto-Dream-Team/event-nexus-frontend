import axios from "axios";
import { DirectiveInfoData } from "../domain/directiveInfo";
import { URL_SERVIDOR_REST } from "../utils/config";

class DiretiveInfoService {

    async createDirectiveInfo(directiveInfoData: DirectiveInfoData): Promise<void> {
        console.log("Creating directive info:", directiveInfoData);
    }

}

export async function fetchDirectives():Promise<DirectiveInfoData[]> {
    const response = await axios.get(`${URL_SERVIDOR_REST}/directive`);
    console.log("EVENT TYPES", response.data)   
    return response.data
}

export const directiveInfoService = new DiretiveInfoService();