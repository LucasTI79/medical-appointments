import { Appointment } from "../../../entities/appointment.entity";
import {
  AppointmentsDate,
  IAppointmentRepository,
} from "../../appointment.repository";

export class AppointmentInMemoryRepository implements IAppointmentRepository {
  findAllSchedulesByDoctorAndDate(
    doctorId: string,
    date: string
  ): Promise<AppointmentsDate[]> {
    throw new Error("Method not implemented.");
  }
  findAppointmentByDoctorAndDateTime(
    doctorId: string,
    date: string
  ): Promise<AppointmentsDate | null> {
    throw new Error("Method not implemented.");
  }
  findByAppointmentByPatientAndDateTime(
    patientId: string,
    date: string
  ): Promise<AppointmentsDate | null> {
    throw new Error("Method not implemented.");
  }
  save(appointment: Appointment): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
