import { Appointment } from "../entities/appointment.entity";

export type AppointmentsDate = {
  date: Date;
};

export interface IAppointmentRepository {
  findAllSchedulesByDoctorAndDate(
    doctorId: string,
    date: string
  ): Promise<AppointmentsDate[]>;

  findAppointmentByDoctorAndDateTime(
    doctorId: string,
    date: string
  ): Promise<AppointmentsDate | null>;

  findByAppointmentByPatientAndDateTime(
    patientId: string,
    date: string
  ): Promise<AppointmentsDate | null>;

  save(appointment: Appointment): Promise<void>;
}
