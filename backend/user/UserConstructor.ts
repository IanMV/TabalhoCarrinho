import bcrypt from "bcrypt";

export class User{
    name: string;
    email: string
    password: string
    favorites: Array<string>
    cart: Array<string>

    constructor(name: string, email: string, password: string){
        this.name = name;
        this.email = email;
        this.password = this.passwordhash(password);
        this.favorites = [];
        this.cart = [];
    }
   
    private  passwordhash(pass: string) {
       return bcrypt.hashSync(pass, 13)
    }
}