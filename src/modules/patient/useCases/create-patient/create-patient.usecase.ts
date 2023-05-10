import { CustomError } from "../../../../errors/custom.error";
import { User } from "../../../users/entities/user.entity";
import { IUserRepository } from "../../../users/repositories/user.repository";
import { Patient } from "../../entities/patient.entity";
import { IPatientRepository } from "../../repositories/patient.repository";

export type CreatePatientRequest = {
  username: string;
  name: string;
  email: string;
  password: string;
  document: string;
};

export class CreatePatientUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly patientRepository: IPatientRepository
  ) {}

  async execute(data: CreatePatientRequest): Promise<Patient> {
    const user = await User.create({
      name: data.name,
      password: data.password,
      username: data.username,
    });

    const existUser = await this.userRepository.findByUsername(data.username);

    if (existUser) {
      throw new CustomError(
        "Username already exists",
        409,
        "USER_EXISTS_ERROR"
      );
    }

    const existPatient = await this.patientRepository.findByDocumentOrEmail(
      data.document,
      data.email
    );

    if (existPatient) {
      throw new CustomError(
        "Patient already exists",
        409,
        "PATIENT_EXISTS_ERROR"
      );
    }

    const userCreated = await this.userRepository.save(user);

    const patient = Patient.create({
      email: data.email,
      document: data.document,
      userId: userCreated.id,
    });

    const patientCreated = await this.patientRepository.save(patient);

    return patientCreated;
  }
}
