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
	public token: string = ""

	constructor(id: number, role: string, img: string, token:string) {
		this.id = id;
		this.role = role;
		this.img = img;
		this.token = token
	}

  fromDto(data: any) {
		return {
		id: data.id,
		role: data.role,
		img: data.img,
		token: data.token
		};
	}

}

export const loginResponseDTO = new LoginResponseDTO(0, "", "", "");