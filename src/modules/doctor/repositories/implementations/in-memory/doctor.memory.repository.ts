import { Doctor } from "../../../entities/doctor.entity";
import { IDoctorRepository } from "../../doctor.repository";

export class DoctorMemoryRepository implements IDoctorRepository {
  doctors: Doctor[] = [];
  async save(data: Doctor): Promise<Doctor> {
    this.doctors.push(data);
    return data;
  }

  async findByCRM(crm: string): Promise<Doctor | null> {
    const doctor = this.doctors.find((doctor) => doctor.crm === crm);
    return doctor || null;
  }

  async findById(id: string): Promise<Doctor | null> {
    const doctor = this.doctors.find((doctor) => doctor.id === id);
    return doctor || null;
  }

  async findByUserId(userId: string): Promise<Doctor | null> {
    const doctor = this.doctors.find((doctor) => doctor.userId === userId);
    return doctor || null;
  }
}
