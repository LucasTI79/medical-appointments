import { prismaClient } from "../../../../infra/databases/prisma.config";
import { Speciality } from "../../entity/speciality.entity";
import { ISpecialityRepository } from "../speciality.repository";

export class SpecialityPrismaRepository implements ISpecialityRepository {
  async findById(id: string): Promise<Speciality | null> {
    const speciality = await prismaClient.speciality.findFirst({
      where: {
        id,
      },
    });

    return speciality || null;
  }

  async findByName(name: string): Promise<Speciality | null> {
    const speciality = await prismaClient.speciality.findFirst({
      where: {
        name,
      },
    });

    return speciality || null;
  }
  async save(data: Speciality): Promise<Speciality> {
    const speciality = await prismaClient.speciality.create({
      data: {
        name: data.name,
        description: data.description,
        id: data.id,
      },
    });

    return speciality;
  }
}
