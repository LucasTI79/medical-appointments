import { DoctorSchedule } from "../../../entities/doctor-schedule.entity";
import { IDoctorScheduleRepository } from "../../doctor-schedule.repository";

export class DoctorScheduleMemoryRepository
  implements IDoctorScheduleRepository
{
  private doctorSchedules: DoctorSchedule[] = [];

  async save(schedule: DoctorSchedule): Promise<void> {
    this.doctorSchedules.push(schedule);
  }

  async findByDoctorIdAndDayOfWeek(
    doctorId: string,
    dayOfWeek: number
  ): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
