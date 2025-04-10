import axios from "axios";
import { URL_SERVIDOR_REST } from "../utils/config";
import { LoginRequestDTO } from "../data/dtos/LoginRequestDTO";
import { LoginResponseDTO } from "../data/dtos/LoginResponseDTO";
class AuthService {

    async loginClient(data: LoginRequestDTO) {
        return axios.post<LoginResponseDTO>(`${URL_SERVIDOR_REST}/login`, data)
    }

}

export const authService = new AuthService()