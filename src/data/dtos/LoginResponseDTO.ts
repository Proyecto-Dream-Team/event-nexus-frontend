
export class LoginResponseDTO {
  public id: number = 0;
  public role: string = "";
  public img: string = "";
  public name: string = "";
  public lastname: string = "";

  constructor(id: number, role: string) {
    this.id = id;
    this.role = role;
  }

  fromDto(data: any) {
    return {
      id: data.id,
      role: data.role,
      img: data.img,
      name: data.name,
      lastname: data.lastname,
    };
  }

}

export const loginResponseDTO = new LoginResponseDTO(0, "");
  