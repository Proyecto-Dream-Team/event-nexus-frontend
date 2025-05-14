import axios from "axios";
import { CredentialsDto } from "../domain/credentials";
import { URL_SERVIDOR_REST } from "../utils/config";

class CredentialsService {

    async confirmCredentials(data: CredentialsDto): Promise<void> {
        await axios.put(`${URL_SERVIDOR_REST}/admin/register`, data);
    }
}

export const credentialService = new CredentialsService();