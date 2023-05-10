import { Router } from "express";
import { ensureAuthenticate } from "../infra/shared/http/middleware/ensure-authenticate.middleware";
import { createDoctorScheduleController } from "../modules/doctor/useCases/create-doctor-schedule";

const doctorScheduleRouter = Router();

doctorScheduleRouter.post(
  "/",
  ensureAuthenticate,
  async (request, response) => {
    await createDoctorScheduleController.handle(request, response);
  }
);

export { doctorScheduleRouter };
