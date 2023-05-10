import { Patient as PatientPrisma, User as UserPrisma } from "@prisma/client";
import { PatientWithUserDTO } from "../dto/patient.dto";
import { Patient } from "../entities/patient.entity";

export class PatientMapper {
  static entityToPrisma(patient: Patient): PatientPrisma {
    return {
      id: patient.id,
      document: patient.document,
      email: patient.email,
      user_id: patient.userId,
    };
  }
  static prismaToEntity(patient: PatientPrisma): Patient {
    return {
      id: patient.id,
      document: patient.document,
      email: patient.email,
      userId: patient.user_id,
    };
  }

  static prismaToEntityIncludesUser(
    patient: PatientPrisma & { user: UserPrisma }
  ): PatientWithUserDTO {
    return {
      id: patient.id,
      document: patient.document,
      email: patient.email,
      userId: patient.user_id,
      user: {
        name: patient.user.name,
      },
    };
  }
}
