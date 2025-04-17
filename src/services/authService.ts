import axios from "axios";
import { LoginRequestDTO, loginResponseDTO, LoginResponseDTO } from "../domain/Login";
import { URL_SERVIDOR_REST } from "../utils/config";
class AuthService {
    

    async loginClient(data: LoginRequestDTO): Promise<boolean> {
        try {
            const res = await axios.post<LoginResponseDTO>(`${URL_SERVIDOR_REST}/auth/login`, data);
            const userData = loginResponseDTO.fromDto(res.data);
            sessionStorage.setItem("userId", userData.id.toString());
            sessionStorage.setItem("userRole", userData.role.toUpperCase());
            sessionStorage.setItem("img", userData.img.toString()); 
            
            // guardar en context
            console.log("Login successful:", userData);
            return res.status < 300;
        } catch (error) {
            console.error("Login failed:", error);
            return false;
        }
    }

}

export const authService = new AuthService()