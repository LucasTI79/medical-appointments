import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../../../errors/custom.error";
import { UserPrismaRepository } from "../../../../modules/users/repositories/implementations/user.prisma.repository";

export const ensureAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userId = request.userId;
  const userRepository = new UserPrismaRepository();
  const user = await userRepository.findById(userId);
  if (!user) {
    throw new CustomError("User not found", 400, "USER_NOT_FOUND");
  }

  if (!user.isAdmin) {
    throw new CustomError("User is not admin", 401, "USER_IS_NOT_ADMIN");
  }

  return next();
};
