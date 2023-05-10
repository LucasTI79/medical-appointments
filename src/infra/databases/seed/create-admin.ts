import { PasswordBcrypt } from "../../shared/crypto/implementations/password.bcrypt";
import { prismaClient } from "../prisma.config";

async function main() {
  const password = await new PasswordBcrypt().hash("admin");
  await prismaClient.user.create({
    data: {
      name: "admin",
      username: "admin",
      password: password,
      isAdmin: true,
    },
  });
}
main();
