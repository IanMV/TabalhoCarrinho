import bcrypt from "bcrypt";

export class Code {
  email: string;
  code: string;
  createAt: Date;

  constructor(email: string, code: number) {
    this.email = email;
    this.code = this.codehash(code);
    this.createAt = new Date();
  }
  private codehash(number: number) {
    const code: string = number.toString();
    return bcrypt.hashSync(code, 12);
  }
}
