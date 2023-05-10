import { Router } from "express";
import { appointmentsRouter } from "./appointment.routes";
import { doctorInfoRouter } from "./doctor-info.routes";
import { doctorScheduleRouter } from "./doctor-schedule.routes";
import { doctorRouter } from "./doctor.routes";
import { patientRouter } from "./patient.routes";
import { specialityRouter } from "./speciality.routes";
import { userRouter } from "./user.routes";

const router = Router();

router.use("/users", userRouter);
router.use("/patients", patientRouter);
router.use("/doctors", doctorRouter);
router.use("/doctor-info", doctorInfoRouter);
router.use("/doctor-schedules", doctorScheduleRouter);
router.use("/specialities", specialityRouter);
router.use("/appointments", appointmentsRouter);

export { router };
