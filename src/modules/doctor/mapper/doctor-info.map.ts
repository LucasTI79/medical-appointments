import { DoctorInfo as DoctorInfoPrisma } from "@prisma/client";
import { DoctorInfo } from "../entities/doctor-info.entity";

export class DoctorInfoMapper {
  static prismaToEntityDoctorInfo = (data: DoctorInfoPrisma): DoctorInfo => ({
    id: data.id,
    doctorId: data.doctor_id,
    duration: data.duration,
    price: Number(data.price),
  });
}
