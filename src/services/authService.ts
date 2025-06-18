import axios from "axios";
import { LoginRequestDTO, loginResponseDTO, LoginResponseDTO } from "../domain/Login";
import { URL_SERVIDOR_REST } from "../utils/config";

class AuthService {
    
    async loginClient(data: LoginRequestDTO): Promise<boolean> {
        try {
            const res = await axios.post<LoginResponseDTO>(`${URL_SERVIDOR_REST}/auth/login`, data);
            const userData = loginResponseDTO.fromDto(res.data);
            sessionStorage.setItem("userId", res.data.id.toString());
            sessionStorage.setItem("userRole", userData.role.toUpperCase());
            sessionStorage.setItem("img", userData.img);
            sessionStorage.setItem("token", userData.token.toString());
            return res.status === 200;
        } catch (error) {
            return false;
        }
    }

}

export const authService = new AuthService()