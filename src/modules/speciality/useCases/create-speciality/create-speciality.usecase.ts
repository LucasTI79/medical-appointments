import { Speciality } from "../../entity/speciality.entity";
import { ISpecialityRepository } from "../../repositories/speciality.repository";

type SpecialityRequest = {
  name: string;
  description: string;
};

export class CreateSpecialityUseCase {
  constructor(private readonly specialityRepository: ISpecialityRepository) {}

  async execute(data: SpecialityRequest): Promise<Speciality> {
    const speciality = new Speciality(data);
    const specialityExists = await this.specialityRepository.findByName(
      speciality.name
    );
    if (specialityExists) {
      throw new Error(`Speciality with name ${speciality.name} already exists`);
    }
    const specialityCreated = await this.specialityRepository.save(speciality);
    return specialityCreated;
  }
}
