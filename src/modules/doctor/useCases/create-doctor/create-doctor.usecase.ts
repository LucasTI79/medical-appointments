import { CustomError } from "../../../../errors/custom.error";
import { ISpecialityRepository } from "../../../speciality/repositories/speciality.repository";
import { User } from "../../../users/entities/user.entity";
import { IUserRepository } from "../../../users/repositories/user.repository";
import { Doctor } from "../../entities/doctor.entity";
import { IDoctorRepository } from "../../repositories/doctor.repository";

export type CreateDoctorRequest = {
  username: string;
  name: string;
  password: string;
  email: string;
  crm: string;
  specialityId: string;
};

export class CreateDoctorUseCase {
  constructor(
    private doctorRepository: IDoctorRepository,
    private readonly userRepository: IUserRepository,
    private readonly specialistRepository: ISpecialityRepository
  ) {}
  async execute(data: CreateDoctorRequest) {
    const user = await User.create({
      name: data.name,
      password: data.password,
      username: data.username,
    });

    const speciality = await this.specialistRepository.findById(
      data.specialityId
    );

    if (!speciality) {
      throw new CustomError(
        "Speciality does not exists",
        404,
        "SPECIALITY_NOT_EXISTS_ERROR"
      );
    }

    const existUser = await this.userRepository.findByUsername(data.username);

    if (existUser) {
      throw new CustomError(
        "Username already exists",
        409,
        "USER_EXISTS_ERROR"
      );
    }

    const userCreated = await this.userRepository.save(user);

    const doctor = Doctor.create({
      crm: data.crm,
      email: data.email,
      specialityId: data.specialityId,
      userId: userCreated.id,
    });

    const crmExists = await this.doctorRepository.findByCRM(data.crm);

    if (crmExists) {
      throw new CustomError("CRM already exists", 409);
    }

    const doctorCreated = await this.doctorRepository.save(doctor);

    return doctorCreated;
  }
}
