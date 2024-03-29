import { CustomError } from "../../../../errors/custom.error";
import { DoctorInfo } from "../../entities/doctor-info.entity";
import { IDoctorInfoRepository } from "../../repositories/doctor-info.repository";
import { IDoctorRepository } from "../../repositories/doctor.repository";

export type CreateDoctorInfoRequest = {
  startAt: string;
  endAt: string;
  price: number;
  duration: number;
};

export class CreateDoctorInfoUseCase {
  constructor(
    private readonly doctorRepository: IDoctorRepository,
    private readonly doctorInfoRepository: IDoctorInfoRepository
  ) {}

  async execute(data: CreateDoctorInfoRequest, userId: string) {
    const doctorByUserId = await this.doctorRepository.findByUserId(userId);

    if (!doctorByUserId) {
      throw new CustomError("Doctor does not exists", 404, "DOCTOR_NOT_EXISTS");
    }

    const doctorInfo = DoctorInfo.create({
      ...data,
      doctorId: doctorByUserId.id,
    });

    const doctorCreated = await this.doctorInfoRepository.saveOrUpdate(
      doctorInfo
    );

    return doctorCreated;
  }
}
