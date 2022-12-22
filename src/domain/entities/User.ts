import { Email } from "../objects";

export type UserEntityProps = {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
};

export class UserEntity {
  private id: string;
  private name: string;
  private email: Email;
  private password: string;
  private avatar: string;

  constructor(props: UserEntityProps) {
    this.id = props.id;
    this.name = props.name;
    this.email = new Email(props.email);
    this.password = props.password;
    this.avatar = props.avatar;
  }

  public getId() {
    return this.id;
  }

  public getName() {
    return this.name;
  }

  public getEmail() {
    return this.email.getEmail();
  }

  public getPassword() {
    return this.password;
  }

  public getAvatar() {
    return this.avatar;
  }
}
