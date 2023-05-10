import dayjs from "dayjs";
import { CustomError } from "../../../../errors/custom.error";
import { dateToString, formatDate, getDayOfWeek } from "../../../../utils/date";
import { IDoctorScheduleRepository } from "../../../doctor/repositories/doctor-schedule.repository";
import { IAppointmentRepository } from "../../repositories/appointment.repository";

export type FreeScheduleRequest = {
  doctorId: string;
  date: Date;
};

type FreeTime = {
  time: string;
};

type FreeScheduleResponse = {
  doctorId: string;
  freeTime: FreeTime[];
};

export class FreeScheduleUseCase {
  constructor(
    private doctorScheduleRepository: IDoctorScheduleRepository,
    private appointmentsRepository: IAppointmentRepository
  ) {}
  async execute(data: FreeScheduleRequest): Promise<FreeScheduleResponse> {
    {
      if (!data.doctorId) {
        throw new CustomError("Doctor is required", 400);
      }

      if (!data.date) {
        throw new CustomError("You need to select a date", 400);
      }

      const dayOfWeek = getDayOfWeek(data.date.toDateString());

      const doctorSchedule =
        await this.doctorScheduleRepository.findByDoctorIdAndDayOfWeek(
          data.doctorId,
          dayOfWeek
        );

      if (!doctorSchedule) {
        throw new CustomError("Doctor does not attend that day!", 400);
      }

      const doctorSchedules =
        await this.appointmentsRepository.findAllSchedulesByDoctorAndDate(
          data.doctorId,
          formatDate(data.date, "YYYY-MM-DD")
        );

      const startAt = doctorSchedule.startAt;
      const endAt = doctorSchedule.endAt;
      const duration = 30;

      let timeNow = startAt;
      const freeTime: FreeTime[] = [];

      while (timeNow <= endAt) {
        const existsAppointment = doctorSchedules.find((appointment) => {
          const appointmentDateFormat = formatDate(appointment.date, "HH:mm");
          return appointmentDateFormat !== timeNow;
        });

        if (!existsAppointment) {
          freeTime.push({
            time: timeNow,
          });
        }

        timeNow = dayjs(data.date + timeNow)
          .add(duration, "minute")
          .format("HH:mm");
      }

      return {
        doctorId: data.doctorId,
        freeTime: freeTime,
      };
    }
  }
}
