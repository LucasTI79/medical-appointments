import { CustomError } from "../../../../errors/custom.error";
import { DoctorSchedule } from "../../entities/doctor-schedule.entity";
import { IDoctorScheduleRepository } from "../../repositories/doctor-schedule.repository";
import { IDoctorRepository } from "../../repositories/doctor.repository";

export type CreateDoctorScheduleRequest = {
  schedules: DoctorSchedulesRequest[];
};

type DoctorSchedulesRequest = {
  startAt: string;
  endAt: string;
  dayOfWeek: number;
};

export class CreateDoctorScheduleUseCase {
  constructor(
    private readonly doctorRepository: IDoctorRepository,
    private readonly doctorScheduleRepository: IDoctorScheduleRepository
  ) {}

  async execute(data: CreateDoctorScheduleRequest, userId: string) {
    const doctor = await this.doctorRepository.findByUserId(userId);
    if (!doctor) {
      throw new CustomError("Doctor does not exists", 400);
    }
    const doctorSchedule = DoctorSchedule.create({
      doctorId: doctor.id,
      schedules: data.schedules,
    });

    await this.doctorScheduleRepository.save(doctorSchedule);
  }
}
