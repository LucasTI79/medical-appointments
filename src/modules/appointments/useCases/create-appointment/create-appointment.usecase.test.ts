import { describe, test, expect } from "vitest";
import { EtherealMailProvider } from "../../../../infra/providers/mail/implementations/ethereal.mail.provider";
import { generateUUID } from "../../../../utils/generateUUID";
import { DoctorScheduleMemoryRepository } from "../../../doctor/repositories/implementations/in-memory/doctor-schedule.memory.repository";
import { DoctorMemoryRepository } from "../../../doctor/repositories/implementations/in-memory/doctor.memory.repository";
import { PatientMemoryRepository } from "../../../patient/repositories/implementations/in-memory/patient.memory.repository";
import { AppointmentInMemoryRepository } from "../../repositories/implementations/memory/appointment.memory.repository";
import { CreateAppointmentUseCase } from "./create-appointment.usecase";

describe("Create Appointment", () => {
  test("Should not be able to create an appointment without a patient or with an invalid patient", () => {
    const patientInMemoryRepository = new PatientMemoryRepository();
    const doctorInMemoryRepository = new DoctorMemoryRepository();
    const doctorScheduleInMemoryRepository =
      new DoctorScheduleMemoryRepository();
    const appointmentInMemoryRepository = new AppointmentInMemoryRepository();
    const etherealMailProvider = new EtherealMailProvider();
    const createAppointmentUseCase = new CreateAppointmentUseCase(
      patientInMemoryRepository,
      doctorInMemoryRepository,
      doctorScheduleInMemoryRepository,
      appointmentInMemoryRepository,
      etherealMailProvider
    );

    expect(async () => {
      await createAppointmentUseCase.execute(
        {
          patientId: "INVALID_PATIENT_ID",
          doctorId: generateUUID(),
          date: new Date(),
        },
        "INVALID_USER_ID"
      );
    }).rejects.toThrow("Patient does not exists");
  });

  test("Should not be able to create an appointment without a doctor or with an invalid doctor", async () => {
    const patientInMemoryRepository = new PatientMemoryRepository();
    const doctorInMemoryRepository = new DoctorMemoryRepository();
    const doctorScheduleInMemoryRepository =
      new DoctorScheduleMemoryRepository();
    const appointmentInMemoryRepository = new AppointmentInMemoryRepository();
    const etherealMailProvider = new EtherealMailProvider();
    const createAppointmentUseCase = new CreateAppointmentUseCase(
      patientInMemoryRepository,
      doctorInMemoryRepository,
      doctorScheduleInMemoryRepository,
      appointmentInMemoryRepository,
      etherealMailProvider
    );

    const patientCreated = await patientInMemoryRepository.save({
      document: "DOCUMENT_PATIENT",
      email: "email@email.com",
      id: generateUUID(),
    const patientCreated = await patientInMemoryRepository.save({
      document: "DOCUMENT_PATIENT",
      email: "email@email.com",
      id: generateUUID(),
      userId: generateUUID(),
    });

    expect(async () => {
      await createAppointmentUseCase.execute(
        {
          patientId: "INVALID_PATIENT_ID",
          doctorId: generateUUID(),
          date: new Date(),
        },
        patientCreated.userId
      );
    }).rejects.toThrow("Doctor does not exists");
  });
});
