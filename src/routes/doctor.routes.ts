import { Router } from "express";
import { createDoctorController } from "../modules/doctor/useCases/create-doctor";

const doctorRouter = Router();

doctorRouter.post("/", async (request, response) => {
  await createDoctorController.handle(request, response);
});

export { doctorRouter };
