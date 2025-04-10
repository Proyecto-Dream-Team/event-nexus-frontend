export class LoginRequestDTO {
  username: string;
  password: string;
    constructor (username: string, password: string ){
        this.username = username;
        this.password = password;
    }
  
    static fromDto(us: string, pass: string): LoginRequestDTO {
        return new LoginRequestDTO(us, pass);
    }
  }

  