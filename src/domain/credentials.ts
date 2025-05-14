    export class CredentialsForm {
        mail: string;
        user: string;
        password: string;
        confirmPassword: string;

        constructor(data: any) {
            this.mail = data.mail;
            this.user = data.user;
            this.password = data.password;
            this.confirmPassword = data.confirmPassword;
        }

        toDto() {
            return {
                mail: this.mail,
                user: this.user,
                password: this.password,
            }
        }

    }

    export class CredentialsDto {
        email: string;
        username: string;
        password: string;

        constructor(data: CredentialsForm) {
            this.email = data.mail;
            this.username = data.user;
            this.password = data.password;
        }

        toDto() {
            return {
                mail: this.email,
                user: this.username,
                password: this.password,
            }
        }
    }