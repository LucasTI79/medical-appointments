import { CustomError } from "../../../../errors/custom.error";
import { IMailProviver } from "../../../../infra/providers/mail/mail.provider";
import {
  dateToString,
  formatDate,
  formatDateUTC,
  getDayOfWeek,
  toDate,
} from "../../../../utils/date";
import { IDoctorScheduleRepository } from "../../../doctor/repositories/doctor-schedule.repository";
import { IDoctorRepository } from "../../../doctor/repositories/doctor.repository";
import { IPatientRepository } from "../../../patient/repositories/patient.repository";
import { Appointment } from "../../entities/appointment.entity";
import { IAppointmentRepository } from "../../repositories/appointment.repository";

export type CreateAppointmentRequest = {
  patientId: string;
  doctorId: string;
  date: Date;
};

export class CreateAppointmentUseCase {
  constructor(
    private patientRepository: IPatientRepository,
    private doctorRepository: IDoctorRepository,
    private doctorScheduleRepository: IDoctorScheduleRepository,
    private appointmentRepository: IAppointmentRepository,
    private mailProvider: IMailProviver
  ) {}

  async execute(data: CreateAppointmentRequest, userId: string) {
    const patientExists = await this.patientRepository.findByUserId(userId);

    if (!patientExists) {
      throw new CustomError(
        "Patient does not exists",
        400,
        "PATIENT_DOES_NOT_EXISTS"
      );
    }

    const doctorExists = await this.doctorRepository.findById(data.doctorId);

    if (!doctorExists) {
      throw new CustomError(
        "Doctor does not exists",
        400,
        "DOCTOR_DOES_NOT_EXISTS"
      );
    }

    const dayOfWeek = getDayOfWeek(dateToString(data.date));

    const doctorSchedule =
      await this.doctorScheduleRepository.findByDoctorIdAndDayOfWeek(
        data.doctorId,
        dayOfWeek
      );

    if (!doctorSchedule) {
      throw new CustomError("Doctor does not attend that day!", 400);
    }

    const dateFormat = formatDateUTC(data.date, "YYYY-MM-DD H:mm");

    const existsAppointmentDoctor =
      await this.appointmentRepository.findAppointmentByDoctorAndDateTime(
        doctorExists.id,
        dateFormat
      );

    if (existsAppointmentDoctor) {
      throw new CustomError(
        "There is already exists as appointment for this time",
        400
      );
    }

    const existsAppointmentPatient =
      await this.appointmentRepository.findByAppointmentByPatientAndDateTime(
        patientExists.id,
        dateFormat
      );

    if (existsAppointmentPatient) {
      throw new CustomError(
        "There is already exists as appointment for this patient",
        400
      );
    }
    const appointment = Appointment.create({
      date: toDate(data.date),
      doctorId: doctorExists.id,
      patientId: patientExists.id,
    });
    await this.appointmentRepository.save(appointment);
    await this.mailProvider.sendMail({
      to: patientExists.email,
      from: "Agendamento de consulta <noreplay@lfalabs.com.br>",
      html: `
        Olá ${patientExists.user.name}! <br/>
        Gostaria de confirmar o <b>agendamento da consulta</b> para o dia ${formatDate(
          data.date,
          "DD/MM/YYYY"
        )} às ${formatDate(data.date, "HH:mm")} com o doutor <b>${
        doctorExists.user.name
      }</b>
      `,
      subject: "Agendamento de consulta",
    });
  }
}
