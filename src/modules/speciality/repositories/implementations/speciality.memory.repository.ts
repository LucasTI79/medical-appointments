import { Speciality } from "../../entity/speciality.entity";
import { ISpecialityRepository } from "../speciality.repository";

export class SpecialityMemoryRepository implements ISpecialityRepository {
  specialities: Speciality[] = [];

  async findByName(name: string): Promise<Speciality | null> {
    return (
      this.specialities.find((speciality) => speciality.name === name) || null
    );
  }
  async save(data: Speciality): Promise<Speciality> {
    this.specialities.push(data);
    return data;
  }
  async findById(id: string): Promise<Speciality | null> {
    return this.specialities.find((speciality) => speciality.id === id) || null;
  }
}
