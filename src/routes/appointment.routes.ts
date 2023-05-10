import { Router } from "express";
import { ensureAuthenticate } from "../infra/shared/http/middleware/ensure-authenticate.middleware";
import { createAppointmentController } from "../modules/appointments/useCases/create-appointment";
import { freeScheduleController } from "../modules/appointments/useCases/free-schedules";

const appointmentsRouter = Router();

appointmentsRouter.get("/free", async (request, response) => {
  await freeScheduleController.handle(request, response);
});

appointmentsRouter.post("/", ensureAuthenticate, async (request, response) => {
  await createAppointmentController.handle(request, response);
});

export { appointmentsRouter };
