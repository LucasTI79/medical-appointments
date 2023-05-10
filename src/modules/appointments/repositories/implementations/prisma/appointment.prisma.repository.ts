import { prismaClient } from "../../../../../infra/databases/prisma.config";
import { generateUUID } from "../../../../../utils/generateUUID";
import { Appointment } from "../../../entities/appointment.entity";
import {
  AppointmentsDate,
  IAppointmentRepository,
} from "../../appointment.repository";

export class AppointmentPrismaRepository implements IAppointmentRepository {
  async findAllSchedulesByDoctorAndDate(
    doctorId: string,
    date: string
  ): Promise<any> {
    const result: AppointmentsDate[] = await prismaClient.$queryRaw`
    SELECT ap.date FROM appointments ap
    WHERE 
      to_char(ap.date, 'YYYY-MM-DD') = ${date}
      AND
      ap.doctor_id = ${doctorId}
    LIMIT 1`;
    return result[0];
  }

  async findAppointmentByDoctorAndDateTime(
    doctorId: string,
    date: string
  ): Promise<AppointmentsDate | null> {
    const result: AppointmentsDate[] = await prismaClient.$queryRaw`
    SELECT ap.date FROM appointments ap
    WHERE 
      to_char(ap.date, 'YYYY-MM-DD HH24:MI') = ${date}
      AND
      ap.doctor_id = ${doctorId}
    LIMIT 1`;
    return result[0];
  }
  async findByAppointmentByPatientAndDateTime(
    patientId: string,
    date: string
  ): Promise<AppointmentsDate | null> {
    const result: AppointmentsDate[] = await prismaClient.$queryRaw`
    SELECT ap.date FROM appointments ap
    WHERE 
      to_char(ap.date, 'YYYY-MM-DD HH24:MI') = ${date}
      AND
      ap.patient_id = ${patientId}
    LIMIT 1`;
    return result[0];
  }

  async save(data: Appointment): Promise<void> {
    await prismaClient.appointment.create({
      data: {
        id: data.id ?? generateUUID(),
        doctor_id: data.doctorId,
        patient_id: data.patientId,
        date: data.date,
      },
    });
  }
}
