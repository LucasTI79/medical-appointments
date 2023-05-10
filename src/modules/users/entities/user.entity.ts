import { randomUUID } from "crypto";
import { ParameterRequiredError } from "../../../errors/parameter-required-error";
import { PasswordBcrypt } from "../../../infra/shared/crypto/implementations/password.bcrypt";
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

  static async create(props: IUser): Promise<User> {
    if (!props.username || !props.password) {
      throw new ParameterRequiredError("Username and password are required");
    }

    const bcrypt = new PasswordBcrypt();
    const passwordHashed = await bcrypt.hash(props.password);
    return new User({
      ...props,
      password: passwordHashed,
    });
  }
}
