export class Email {
  private email: string;

  constructor(email: string) {
    this.validateEmail(email);
    this.email = email;
  }

  private validateEmail(email: string) {
    if (this.isInvalidEmail(email)) {
      throw new Error("Invalid E-mail");
    }
  }

  private isInvalidEmail(email: string) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    return !regex.test(email);
  }

  getEmail() {
    return this.email;
  }
}
