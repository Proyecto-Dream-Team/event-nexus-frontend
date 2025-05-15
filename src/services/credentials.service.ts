import axios from "axios";
import { CredentialsDto } from "../domain/credentials";
import { URL_SERVIDOR_REST } from "../utils/config";

class CredentialsService {
    async changePassword(data: CredentialsDto) : Promise<any> {
        const res = await axios.put(`${URL_SERVIDOR_REST}/admin/recovery`, data);
        return res;
    }

    async confirmCredentials(data: CredentialsDto): Promise<any> {
        const res = await axios.put(`${URL_SERVIDOR_REST}/admin/register`, data);
        return res;
    }
}

export const credentialService = new CredentialsService();