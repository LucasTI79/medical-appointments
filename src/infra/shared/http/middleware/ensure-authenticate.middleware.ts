import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../../../errors/custom.error";
import { JWTToken } from "../../token/implentations/jwt.token";

export const ensureAuthenticate = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const headerAuth = request.headers.authorization;
  if (!headerAuth) {
    throw new CustomError("Token is missing", 401);
  }

  const [, token] = headerAuth.split(" ");

  if (!token) {
    throw new CustomError("Token is missing", 401);
  }

  const verifyToken = new JWTToken().validate(token);

  if (verifyToken) {
    request.userId = verifyToken.sub;
    return next();
  }

  return response.status(401).json({
    error: "Token is invalid",
  });
};
