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

  
export class LoginResponseDTO {
  public id: number = 0;
  public role: string = "";
  public img: string = "";  

  constructor(id: number, role: string, img: string) {
    this.id = id;
    this.role = role;
    this.img = img;
  }

  fromDto(data: any) {
    return {
      id: data.id,
      role: data.role,
      img: data.img,
    };
  }

}

export const loginResponseDTO = new LoginResponseDTO(0, "", "");