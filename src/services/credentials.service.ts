import axios from "axios";
import { CredentialsDto } from "../domain/credentials";

class CredentialsService {
    async changePassword(data: CredentialsDto) : Promise<any> {
        const url = process.env.REACT_APP_URL_SERVIDOR_REST;
        const res = await axios.put(`${url}/admin/recovery`, data);
        return res;
    }

    async confirmCredentials(data: CredentialsDto): Promise<any> {
        const url = process.env.REACT_APP_URL_SERVIDOR_REST;
        const res = await axios.put(`${url}/admin/register`, data);
        return res;
    }
}

export const credentialService = new CredentialsService();