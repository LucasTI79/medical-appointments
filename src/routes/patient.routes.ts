import { Router } from "express";
import { createPatientController } from "../modules/patient/useCases/create-patient";

const patientRouter = Router();

patientRouter.post("/", async (request, response) => {
  await createPatientController.handle(request, response);
});

export { patientRouter };
