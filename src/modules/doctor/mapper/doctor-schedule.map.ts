import { DoctorSchedule } from "../entities/doctor-schedule.entity";
import {
  Doctor,
  DoctorInfo,
  DoctorSchedule as DoctorSchedulePrisma,
} from "@prisma/client";
import { generateUUID } from "../../../utils/generateUUID";

export type DoctorScheduleWeek = {
  startAt: string;
  endAt: string;
  dayOfWeek: number;
  doctorId: string;
  doctor: {
    doctorInfo: {
      duration: number;
    };
  };
};

export class DoctorScheduleMapper {
  static entityToPrisma(data: DoctorSchedule): DoctorSchedulePrisma[] {
    return data.schedules.map((schedule) => ({
      day_of_week: schedule.dayOfWeek,
      end_at: schedule.endAt,
      start_at: schedule.startAt,
      doctor_id: data.doctorId,
      id: schedule.id ?? generateUUID(),
    }));
  }

  static prismaToEntity(
    schedule: DoctorSchedulePrisma & {
      doctor: Doctor & {
        doctorInfo: DoctorInfo | null;
      };
    }
  ): DoctorScheduleWeek {
    return {
      dayOfWeek: schedule.day_of_week,
      startAt: schedule.start_at,
      endAt: schedule.end_at,
      doctorId: schedule.doctor_id,
      doctor: {
        doctorInfo: {
          duration: schedule.doctor.doctorInfo?.duration || 0,
        },
      },
    };
  }
}
