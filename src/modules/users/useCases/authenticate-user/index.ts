import { PasswordBcrypt } from "../../../../infra/shared/crypto/implementations/password.bcrypt";
import { JWTToken } from "../../../../infra/shared/token/implentations/jwt.token";
import { UserPrismaRepository } from "../../repositories/implementations/user.prisma.repository";
import { AuthenticateUserController } from "./authenticate-user.controller";

const userPrismaRepository = new UserPrismaRepository();
const passwordBcrypt = new PasswordBcrypt();
const token = new JWTToken();
const authenticateUserController = new AuthenticateUserController(
  userPrismaRepository,
  passwordBcrypt,
  token
);
export { authenticateUserController };
