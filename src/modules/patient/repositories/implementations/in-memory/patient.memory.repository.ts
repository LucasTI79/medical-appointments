import { DoctorWithUserDTO } from "../../../../doctor/dto/doctor.dto";
import { Patient } from "../../../entities/patient.entity";
import { PatientMapper } from "../../../mapper/patient.mapper";
import { IPatientRepository } from "../../patient.repository";

export class PatientMemoryRepository implements IPatientRepository {
  private patients: Patient[] = [];

  async save(data: Patient): Promise<Patient> {
    this.patients.push(data);
    return data;
  }
  async findByDocumentOrEmail(
    document: string,
    email: string
  ): Promise<Patient | null> {
    const patient = this.patients.find((patient) => {
      if (patient.email === email) return true;
      if (patient.document === document) return true;
      return false;
    });
    if (patient) {
      return patient;
    }
    return null;
  }

  async findByUserId(userId: string): Promise<Doctor | null> {
    const patient = this.patients.find((patient) => patient.userId === userId);
    if (patient) {
      return patient;
    }

    return null;
  }
}
