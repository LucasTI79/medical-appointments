import { randomUUID } from "crypto";
type IUser = {
  name: string;
  username: string;
  password: string;
};

export class User {
  id: string;
  name: string;
  username: string;
  password: string;
  isAdmin: boolean;

  private constructor(props: IUser) {
    this.name = props.name;
    this.username = props.username;
    this.password = props.password;
    this.id = randomUUID();
    this.isAdmin = false;
  }

  static create(props: IUser): User {
    return new User(props);
  }
}
