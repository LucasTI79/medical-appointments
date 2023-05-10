import { PatientWithUserDTO } from "../dto/patient.dto";
import { Patient } from "../entities/patient.entity";

export interface IPatientRepository {
  save(data: Patient): Promise<Patient>;
  findByUserId(userId: string): Promise<PatientWithUserDTO | null>;
  findByDocumentOrEmail(
    document: string,
    email: string
  ): Promise<Patient | null>;
}
