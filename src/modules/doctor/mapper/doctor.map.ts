import { Doctor as DoctorPrisma, User as UserPrisma } from "@prisma/client";
import { DoctorWithUserDTO } from "../dto/doctor.dto";
import { Doctor } from "../entities/doctor.entity";

export class DoctorMapper {
  static prismaToEntityDoctor = (data: DoctorPrisma): Doctor => ({
    crm: data.crm,
    email: data.email,
    specialityId: data.speciality_id,
    userId: data.user_id,
    id: data.id,
  });

  static prismaToEntityDoctorIncludesUser = (
    data: DoctorPrisma & { user: UserPrisma }
  ): DoctorWithUserDTO => ({
    crm: data.crm,
    email: data.email,
    specialityId: data.speciality_id,
    userId: data.user_id,
    id: data.id,
    user: {
      name: data.user.name,
    },
  });
}
