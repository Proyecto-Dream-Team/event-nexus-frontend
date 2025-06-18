import axios from "axios";
import { DirectiveInfoData } from "../domain/directiveInfo";

class DiretiveInfoService {
    async createDirectiveInfo(directiveInfoData: DirectiveInfoData): Promise<void> {
        const url = process.env.REACT_APP_URL_SERVIDOR_REST;
        const response = await axios.post(`${url}/directive/create`,directiveInfoData);
        console.log("Creating directive info:", response);
    }
    
    async fetchDirectives():Promise<DirectiveInfoData[]> {
        const url = process.env.REACT_APP_URL_SERVIDOR_REST;
        const response = await axios.get(`${url}/directive`);
        console.log("EVENT TYPES", response.data)   
        return response.data
    }
}


export const directiveInfoService = new DiretiveInfoService();