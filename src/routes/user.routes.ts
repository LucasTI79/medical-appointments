import { Router } from "express";
import { CreateUserController } from "../useCases/create-user/create-user.controller";

const userRouter = Router();
const createUserController = new CreateUserController();

userRouter.post("/", createUserController.handle);

export { userRouter };
